/**
 * Three.js Manager
 * 
 * Handles Three.js scene setup, GLTF loading with LoadingManager,
 * and warmup sequence (shader compilation, first frame render).
 */

import { updateLoaderUI, finishLoader, handleFastLoad } from './loaderManager';
import { getOptimalPixelRatio } from './threeUtils';
import { rendererSettings, cameraSettings, lightingSettings, modelSettings } from '@/config/three-settings';

// Types for Three.js objects (imported dynamically)
type THREE = typeof import('three');
type Scene = import('three').Scene;
type PerspectiveCamera = import('three').PerspectiveCamera;
type WebGLRenderer = import('three').WebGLRenderer;
type Group = import('three').Group;
type DirectionalLight = import('three').DirectionalLight;
type AmbientLight = import('three').AmbientLight;

/**
 * Three.js scene state container
 */
export interface ThreeState {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    model: Group | null;
    // Lighting references for scroll-based control
    frontLight?: DirectionalLight;
    ambientLight?: AmbientLight;
    // Light helper for debugging (needs update in render loop)
    frontLightHelper?: any;
}

/**
 * Load Three.js and its loaders dynamically
 * This keeps the main bundle small
 */
async function loadThreeDynamically() {
    const [THREE, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
    ]);

    return { THREE, GLTFLoader, DRACOLoader };
}

/**
 * Initialize the Three.js scene, camera, and renderer
 * @param canvas - The canvas element to render to
 * @param THREE - The Three.js module
 */
function initializeScene(canvas: HTMLCanvasElement, THREE: THREE): ThreeState {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        cameraSettings.fov,
        window.innerWidth / window.innerHeight,
        cameraSettings.near,
        cameraSettings.far
    );
    camera.position.set(
        cameraSettings.initialPosition.x,
        cameraSettings.initialPosition.y,
        cameraSettings.initialPosition.z
    );

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        ...rendererSettings.contextAttributes,
    });
    renderer.setPixelRatio(getOptimalPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Use neutral tone mapping for accurate Blender colors
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // =========================================
    // LIGHTING SETUP - EDIT VALUES HERE
    // =========================================

    // Ambient light - base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);  // intensity: 0-5
    scene.add(ambientLight);

    // Hemisphere light - sky/ground
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xeeeeee, 1.5);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // MAIN FRONT LIGHT - ATTACHED TO CAMERA (always in front)
    const frontLight = new THREE.DirectionalLight(0xffffff, 3.0);  // intensity: 0-5
    frontLight.position.set(0, 0, 1);  // Directly in front of camera
    camera.add(frontLight);
    scene.add(camera);  // Camera must be in scene for attached lights to work

    // Top fill light - also camera-relative
    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(20, 10, 0.5);  // Above and slightly in front
    camera.add(topLight);

    // DEBUG: Axes helper - remove after done testing
    // const axesHelper = new THREE.AxesHelper(0.9);
    // scene.add(axesHelper);

    return { scene, camera, renderer, model: null };
}

/**
 * Load GLTF model with LoadingManager for progress tracking
 * @param url - URL of the GLTF/GLB file
 * @param THREE - Three.js module
 * @param GLTFLoader - GLTF loader class
 * @param DRACOLoader - Draco loader class
 */
// Types for Transform Configuration
export interface TransformConfig {
    scale: number;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
}

// Neutral default transform
const defaultTransform: TransformConfig = {
    scale: modelSettings.defaultScale,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: -Math.PI / 2, y: 0, z: 0 }
};

/**
 * Load GLTF model with LoadingManager for progress tracking
 */
async function loadGLTFwithManager(
    url: string,
    THREE: THREE,
    GLTFLoader: typeof import('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader,
    DRACOLoader: typeof import('three/examples/jsm/loaders/DRACOLoader.js').DRACOLoader,
    transformConfig: TransformConfig = defaultTransform
): Promise<Group> {
    return new Promise((resolve, reject) => {
        // ... (existing loading manager setup)
        const manager = new THREE.LoadingManager();
        manager.onProgress = (_url, loaded, total) => {
            const percent = Math.round((loaded / total) * 100);
            handleFastLoad(percent);
        };
        manager.onError = (url) => {
            console.error(`Error loading: ${url}`);
            reject(new Error(`Failed to load: ${url}`));
        };

        const dracoLoader = new DRACOLoader(manager);
        dracoLoader.setDecoderPath(modelSettings.dracoDecoderPath);
        const loader = new GLTFLoader(manager);
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            url,
            (gltf) => {
                const model = gltf.scene;

                // --------------------------------------------------------
                // MODEL HIERARCHY SETUP
                // --------------------------------------------------------
                // Wrapper: Controls Position, Scale, Manual Tilt, and Animation Spin
                const wrapper = new THREE.Group();
                wrapper.add(model);

                // Correction: Hardcoded rotation to make model stand up
                // This is hidden from the user so they can work with 0,0,0
                model.rotation.x = -Math.PI / 2;
                model.rotation.y = 0;
                model.rotation.z = 0;

                // Center the Inner Model (Geometric Centering)
                if (modelSettings.centerModel) {
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    // Apply offset to inner model to center it within the wrapper
                    model.position.sub(center);
                }

                // --------------------------------------------------------
                // APPLY USER CONFIG TO WRAPPER
                // --------------------------------------------------------

                // 3. Apply Scale and Rotation (Use Config or Defaults)
                const { scale, rotation } = transformConfig;

                // Get mobile scale factor for initial load
                let mobileScaleFactor = 1.0;
                if (typeof window !== 'undefined') {
                    if (window.innerWidth < 480) {
                        mobileScaleFactor = 0.3; // 30% scale on very small mobile
                    } else if (window.innerWidth < 768) {
                        mobileScaleFactor = 0.4; // 40% scale on mobile
                    }
                }

                // Scale applies to the wrapper with mobile factor
                wrapper.scale.setScalar(scale * mobileScaleFactor);

                // Rotation applies to the wrapper
                wrapper.rotation.set(rotation.x, rotation.y, rotation.z);

                // Apply Position Offset (Use Config or Defaults)
                const { position } = transformConfig;

                // On mobile, center the model
                if (mobileScaleFactor < 1) {
                    wrapper.position.x = 0;
                    wrapper.position.y = position.y + 0.4;
                    wrapper.position.z = position.z;
                } else {
                    wrapper.position.x += position.x;
                    wrapper.position.y += position.y;
                    wrapper.position.z += position.z;
                }

                // 5. Add Axes Helper (Attached to Wrapper to show effective center)
                if (modelSettings.showAxes) {
                    const axesHelper = new THREE.AxesHelper(0.5); // Larger helper
                    wrapper.add(axesHelper);
                }

                // Preserve original Blender material colors
                // Only adjust if needed for lighting compatibility
                model.traverse((child) => {
                    const mesh = child as import('three').Mesh;
                    if (mesh.isMesh && mesh.material) {
                        const material = mesh.material as import('three').MeshStandardMaterial;
                        // Keep original Blender colors - don't override metalness/roughness
                        // material.metalness = 0.3;  // Commented out - was making it too dark
                        // material.roughness = 0.2;  // Commented out - was making it too dark
                        material.envMapIntensity = 1.0; // Neutral environment mapping
                        material.needsUpdate = true;
                    }
                });

                // Return the wrapper as the "model"
                resolve(wrapper);
            },
            undefined,
            reject
        );
    });
}

/**
 * Warmup the scene by rendering a frame
 * This compiles shaders and ensures first frame is ready
 */
async function warmupScene(
    scene: Scene,
    renderer: WebGLRenderer,
    camera: PerspectiveCamera
): Promise<void> {
    // Render one frame to compile shaders
    renderer.render(scene, camera);

    // Wait for GPU to finish
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
}

/**
 * Wait for first visible frame to be painted
 */
async function waitForFirstFrame(): Promise<void> {
    await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}

/**
 * Full initialization sequence
 */
export async function initializeThreeScene(
    canvas: HTMLCanvasElement,
    modelUrl: string = modelSettings.defaultModelUrl,
    transformConfig: TransformConfig = defaultTransform
): Promise<ThreeState> {
    const { THREE, GLTFLoader, DRACOLoader } = await loadThreeDynamically();
    const state = initializeScene(canvas, THREE);

    const model = await loadGLTFwithManager(
        modelUrl,
        THREE,
        GLTFLoader,
        DRACOLoader,
        transformConfig
    );
    state.model = model;
    state.scene.add(model);

    await warmupScene(state.scene, state.renderer, state.camera);
    await waitForFirstFrame();
    await finishLoader();

    return state;
}

/**
 * Create resize handler for the renderer and camera
 */
export function createResizeHandler(
    renderer: WebGLRenderer,
    camera: PerspectiveCamera,
    model: Group | null = null,
    transformConfig: TransformConfig = defaultTransform
): () => void {
    return () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(getOptimalPixelRatio());

        // Responsive Model Positioning & Scaling
        if (model) {
            if (width < 480) {
                // Very small mobile: 30% scale, centered, moved up
                model.position.x = 0;
                model.position.y = 0.5;
                model.scale.setScalar(transformConfig.scale * 0.3);
            } else if (width < 768) {
                // Mobile: 40% scale, centered, moved up
                model.position.x = 0;
                model.position.y = 0.4;
                model.scale.setScalar(transformConfig.scale * 0.4);
            } else {
                // Desktop: Restore Provided settings
                const { position, scale } = transformConfig;
                model.position.x = position.x;
                model.position.y = position.y;
                model.position.z = position.z;
                model.scale.setScalar(scale);
            }
        }
    };
}

/**
 * Create animation loop
 * @param onUpdate - Optional callback called each frame before render
 */
export function createAnimationLoop(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    onUpdate?: () => void
): { start: () => void; stop: () => void } {
    let animationId: number | null = null;

    const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Call update callback if provided (for mouse tracking etc.)
        if (onUpdate) {
            onUpdate();
        }

        renderer.render(scene, camera);
    };

    return {
        start: () => {
            if (animationId === null) animate();
        },
        stop: () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        },
    };
}
