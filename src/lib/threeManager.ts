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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = rendererSettings.outputSettings.toneMappingExposure;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(
        lightingSettings.ambient.color,
        lightingSettings.ambient.intensity
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        lightingSettings.directional.color,
        lightingSettings.directional.intensity
    );
    directionalLight.position.set(
        lightingSettings.directional.position.x,
        lightingSettings.directional.position.y,
        lightingSettings.directional.position.z
    );
    scene.add(directionalLight);

    return { scene, camera, renderer, model: null };
}

/**
 * Load GLTF model with LoadingManager for progress tracking
 * @param url - URL of the GLTF/GLB file
 * @param THREE - Three.js module
 * @param GLTFLoader - GLTF loader class
 * @param DRACOLoader - Draco loader class
 */
async function loadGLTFwithManager(
    url: string,
    THREE: THREE,
    GLTFLoader: typeof import('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader,
    DRACOLoader: typeof import('three/examples/jsm/loaders/DRACOLoader.js').DRACOLoader
): Promise<Group> {
    return new Promise((resolve, reject) => {
        // Create LoadingManager for progress tracking
        const manager = new THREE.LoadingManager();

        manager.onProgress = (_url, loaded, total) => {
            const percent = Math.round((loaded / total) * 100);
            handleFastLoad(percent);
        };

        manager.onError = (url) => {
            console.error(`Error loading: ${url}`);
            reject(new Error(`Failed to load: ${url}`));
        };

        // Setup Draco loader
        const dracoLoader = new DRACOLoader(manager);
        dracoLoader.setDecoderPath(modelSettings.dracoDecoderPath);

        // Setup GLTF loader
        const loader = new GLTFLoader(manager);
        loader.setDRACOLoader(dracoLoader);

        // Load the model
        loader.load(
            url,
            (gltf) => {
                const model = gltf.scene;

                // Center and scale model if configured
                if (modelSettings.centerModel) {
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                }

                model.scale.setScalar(modelSettings.defaultScale);
                resolve(model);
            },
            undefined, // Progress is handled by LoadingManager
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
 * @param canvas - Canvas element
 * @param modelUrl - URL of the GLTF model
 * @returns ThreeState with all initialized objects
 */
export async function initializeThreeScene(
    canvas: HTMLCanvasElement,
    modelUrl: string = modelSettings.defaultModelUrl
): Promise<ThreeState> {
    // Dynamically load Three.js
    const { THREE, GLTFLoader, DRACOLoader } = await loadThreeDynamically();

    // Initialize scene
    const state = initializeScene(canvas, THREE);

    // Load model with progress tracking
    const model = await loadGLTFwithManager(
        modelUrl,
        THREE,
        GLTFLoader,
        DRACOLoader
    );
    state.model = model;
    state.scene.add(model);

    // Warmup sequence
    await warmupScene(state.scene, state.renderer, state.camera);
    await waitForFirstFrame();

    // Complete loading sequence (fades out loader, shows canvas)
    await finishLoader();

    return state;
}

/**
 * Create resize handler for the renderer and camera
 */
export function createResizeHandler(
    renderer: WebGLRenderer,
    camera: PerspectiveCamera
): () => void {
    return () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(getOptimalPixelRatio());
    };
}

/**
 * Create animation loop
 */
export function createAnimationLoop(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera
): { start: () => void; stop: () => void } {
    let animationId: number | null = null;

    const animate = () => {
        animationId = requestAnimationFrame(animate);
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
