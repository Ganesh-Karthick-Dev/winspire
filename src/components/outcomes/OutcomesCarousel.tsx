'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HiCog, HiCurrencyDollar, HiShieldCheck, HiCode, HiChartBar } from 'react-icons/hi';
import styles from '@/styles/OutcomesCarousel.module.css';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Slide data
const slides = [
    {
        id: 1,
        title: 'Operational',
        titleHighlight: 'Efficiency',
        description: 'Neura AI automates repetitive work, predicts bottlenecks, allocates tasks, and minimizes human dependency — giving teams the stability and clarity they never had before.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            '30% higher productivity',
            '24 hour turnaround times',
            'Elimination of backlog',
            'Streamlined workflows across all departments',
        ],
        icon: HiCog,
    },
    {
        id: 2,
        title: 'Financial',
        titleHighlight: 'Acceleration',
        description: 'Your cash moves faster because your processes become intelligent.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            '20–50% reduction in AR days, 3 - 6 months',
            'Higher collectible revenue',
            'Real-time cash acceleration insights',
            'Reduced cost-to-collect',
        ],
        icon: HiCurrencyDollar,
    },
    {
        id: 3,
        title: 'Denial Prevention &',
        titleHighlight: 'Appeals Intelligence',
        description: "Neura doesn't just fix denials — it predicts them before they happen.",
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Avoidable denials drop below 1%',
            'Appealed within 24 to 48 hrs of denial posting',
            'Auto-generated appeals increase success rates',
            'Compliance improves across payers',
        ],
        icon: HiShieldCheck,
    },
    {
        id: 4,
        title: 'Clinical & Coding',
        titleHighlight: 'Accuracy',
        description: 'Coded by the top 1% of talents and documentation insights deliver consistent accuracy.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Higher E&M coding accuracy',
            'Improved HCC capture',
            'Lower coding cost',
            'Near-zero coding backlog',
        ],
        icon: HiCode,
    },
    {
        id: 5,
        title: 'Visibility &',
        titleHighlight: 'Control',
        description: 'Real-time dashboards allow leaders to see everything happening inside their revenue cycle.',
        resultsHeading: 'Results Clients See:',
        bullets: [
            'Transparency across all departments',
            'Stronger provider satisfaction',
            'Clear KPIs for decision-making',
            'No surprises in reporting',
        ],
        icon: HiChartBar,
    },
];

// Three.js types
type ThreeState = {
    scene: import('three').Scene;
    camera: import('three').PerspectiveCamera;
    renderer: import('three').WebGLRenderer;
    model: import('three').Group | null;
};

export default function OutcomesCarousel() {
    const sectionRef = useRef<HTMLElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressFillsRef = useRef<(HTMLDivElement | null)[]>([]);
    const iconButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const modelContainerRef = useRef<HTMLDivElement>(null);
    const threeStateRef = useRef<ThreeState | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const currentSlideRef = useRef(0);

    // Initialize Three.js scene
    const initThreeScene = useCallback(async () => {
        const container = modelContainerRef.current;
        if (!container) return;

        // Dynamic import Three.js
        const [THREE, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
            import('three'),
            import('three/examples/jsm/loaders/GLTFLoader.js'),
            import('three/examples/jsm/loaders/DRACOLoader.js'),
        ]);

        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create scene
        const scene = new THREE.Scene();

        // Create camera - move back for larger model
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(0, 0, 7);

        // Create renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.9);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLight.position.set(2, 2, 8);
        scene.add(frontLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(-2, -2, -8);
        scene.add(backLight);

        // Setup Draco loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        // Setup GLTF loader
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        // Load model
        try {
            const gltf = await loader.loadAsync('/models/Winspire Logo.glb');
            const model = gltf.scene;

            // Scale and position model - bigger size
            model.scale.setScalar(600);
            model.rotation.x = -Math.PI / 2;

            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            scene.add(model);
            threeStateRef.current = { scene, camera, renderer, model };

            // Start animation loop
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);

                // Continuous rotation
                if (threeStateRef.current?.model) {
                    threeStateRef.current.model.rotation.z += 0.003;
                }

                renderer.render(scene, camera);
            };
            animate();
        } catch (error) {
            console.error('Failed to load 3D model:', error);
        }

        // Handle resize
        const handleResize = () => {
            if (!container || !threeStateRef.current) return;
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            threeStateRef.current.camera.aspect = newWidth / newHeight;
            threeStateRef.current.camera.updateProjectionMatrix();
            threeStateRef.current.renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Rotate model on slide change
    const rotateModel = useCallback((slideIndex: number) => {
        if (!threeStateRef.current?.model) return;

        const model = threeStateRef.current.model;
        const targetRotationY = (slideIndex * Math.PI * 2) / 5; // 72 degrees per slide

        gsap.to(model.rotation, {
            y: targetRotationY,
            duration: 0.8,
            ease: 'power2.inOut',
        });
    }, []);

    // Initialize 3D scene
    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const init = async () => {
            cleanup = await initThreeScene();
        };

        // Delay initialization to ensure container is mounted
        const timer = setTimeout(init, 100);

        return () => {
            clearTimeout(timer);
            if (cleanup) cleanup();
        };
    }, [initThreeScene]);

    // Setup scroll animations
    useEffect(() => {
        const section = sectionRef.current;
        const slideElements = slidesRef.current;
        const progressFills = progressFillsRef.current;
        const iconButtons = iconButtonsRef.current;

        if (!section) return;

        const ctx = gsap.context(() => {
            // Main timeline with pinning
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=500%', // 5 slides worth of scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const totalSlides = slides.length;
                        const slideProgress = progress * totalSlides;
                        const currentSlide = Math.min(Math.floor(slideProgress), totalSlides - 1);
                        const withinSlideProgress = slideProgress - currentSlide;

                        // Update slides visibility
                        slideElements.forEach((slide, index) => {
                            if (!slide) return;
                            if (index === currentSlide) {
                                slide.classList.add(styles.active);
                            } else {
                                slide.classList.remove(styles.active);
                            }
                        });

                        // Update progress bar fills
                        progressFills.forEach((fill, index) => {
                            if (!fill) return;
                            if (index < currentSlide) {
                                fill.style.width = '100%';
                            } else if (index === currentSlide) {
                                fill.style.width = `${withinSlideProgress * 100}%`;
                            } else {
                                fill.style.width = '0%';
                            }
                        });

                        // Update icon buttons
                        iconButtons.forEach((button, index) => {
                            if (!button) return;
                            button.classList.remove(styles.active, styles.completed);
                            if (index < currentSlide) {
                                button.classList.add(styles.completed);
                            } else if (index === currentSlide) {
                                button.classList.add(styles.active);
                            }
                        });

                        // Rotate model on slide change
                        if (currentSlide !== currentSlideRef.current) {
                            currentSlideRef.current = currentSlide;
                            rotateModel(currentSlide);
                        }
                    },
                },
            });

            // Ensure first slide is visible initially
            if (slideElements[0]) {
                slideElements[0].classList.add(styles.active);
            }
            if (iconButtons[0]) {
                iconButtons[0].classList.add(styles.active);
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [rotateModel]);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Left Content Area */}
                <div className={styles.contentArea}>
                    <div className={styles.slidesWrapper}>
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                ref={(el) => { slidesRef.current[index] = el; }}
                                className={styles.slide}
                            >
                                <h2 className={styles.slideTitle}>
                                    {slide.title} <span>{slide.titleHighlight}</span>
                                </h2>
                                <p className={styles.slideDescription}>
                                    {slide.description}
                                </p>
                                <p className={styles.resultsHeading}>
                                    {slide.resultsHeading}
                                </p>
                                <ul className={styles.bulletList}>
                                    {slide.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} className={styles.bulletItem}>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Model Area */}
                <div className={styles.modelArea}>
                    <div
                        ref={modelContainerRef}
                        className={styles.modelContainer}
                    />
                </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    {slides.map((slide, index) => {
                        const IconComponent = slide.icon;
                        return (
                            <div key={slide.id} className={styles.progressSegment}>
                                <button
                                    ref={(el) => { iconButtonsRef.current[index] = el; }}
                                    className={styles.iconButton}
                                    aria-label={`${slide.title} ${slide.titleHighlight}`}
                                >
                                    <IconComponent />
                                </button>
                                <div className={styles.progressLine}>
                                    <div
                                        ref={(el) => { progressFillsRef.current[index] = el; }}
                                        className={styles.progressFill}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
