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

/**
 * Three.js scene state container
 */
export interface ThreeState {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    model: Group | null;
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

    // Add lighting for glossy effect

    // Ambient light - strong base for all surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Hemisphere light - balanced sky/ground fill
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.9);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Main directional light - FRONT
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4);
    frontLight.position.set(2, -1, 8);
    scene.add(frontLight);

    // Back light - for when model rotates
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-2, 1, -8);
    scene.add(backLight);

    // Left side light
    const leftLight = new THREE.DirectionalLight(0xffffff, 0.3);
    leftLight.position.set(-8, 0, 0);
    scene.add(leftLight);

    // Right side light  
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rightLight.position.set(8, 0, 0);
    scene.add(rightLight);

    // Bottom light - for lower parts when model rotates
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomLight.position.set(0, -8, 4);
    scene.add(bottomLight);

    // Center point light - illuminates all surfaces for 3D depth effect
    const centerLight = new THREE.PointLight(0xffffff, 0.8, 20);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

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
                const rawBox = new THREE.Box3().setFromObject(model);
                const rawCenter = rawBox.getCenter(new THREE.Vector3());

                // 3. Apply Scale and Rotation (Use Config or Defaults)
                const { scale, rotation } = transformConfig;
                model.scale.setScalar(scale);
                model.rotation.set(rotation.x, rotation.y, rotation.z);

                // 4. Center Model in Scene
                if (modelSettings.centerModel) {
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                }

                // Apply Position Offset (Use Config or Defaults)
                const { position } = transformConfig;
                model.position.x += position.x;
                model.position.y += position.y;
                model.position.z += position.z;

                // 5. Add Axes Helper
                if (modelSettings.showAxes) {
                    const axesHelper = new THREE.AxesHelper(0.2);
                    axesHelper.position.copy(rawCenter);
                    model.add(axesHelper);
                }

                // Apply glossy material
                model.traverse((child) => {
                    const mesh = child as import('three').Mesh;
                    if (mesh.isMesh && mesh.material) {
                        const material = mesh.material as import('three').MeshStandardMaterial;
                        material.metalness = 0.3;
                        material.roughness = 0.2;
                        material.envMapIntensity = 1.5;
                        material.needsUpdate = true;
                    }
                });

                resolve(model);
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

        // Responsive Model Positioning
        if (model) {
            if (width < 768) {
                // Mobile: Move model UP (top) and center
                model.position.x = 0;
                model.position.y = 0.4;
                // Mobile scale is 75% of desktop scale (whether manual or default)
                model.scale.setScalar(transformConfig.scale * 0.75);
            } else {
                // Desktop: Restore Provided settings (Neutral or Manual)
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
