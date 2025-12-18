/**
 * Model Debug GUI Component
 * 
 * Provides a live control panel (lil-gui) to adjust 3D model
 * position, rotation, and scale in real-time.
 * 
 * Shows final values to copy into three-settings.ts
 */

import { useEffect, useRef, useState } from 'react';
import GUI from 'lil-gui';
import { disableLoader, enableLoader, isLoaderDisabled } from '@/lib/loaderManager';

interface ModelDebugGUIProps {
    /** Current transform values */
    transform: {
        scale: number;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
    };
    /** Callback when transform changes */
    onTransformChange: (transform: {
        scale: number;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
    }) => void;
    /** Rotation speed */
    rotateSpeed?: number;
    /** Callback when rotation speed changes */
    onRotateSpeedChange?: (speed: number) => void;
}

export default function ModelDebugGUI({
    transform,
    onTransformChange,
    rotateSpeed = 0,
    onRotateSpeedChange,
}: ModelDebugGUIProps) {
    const guiRef = useRef<GUI | null>(null);
    const [loaderEnabled, setLoaderEnabled] = useState(!isLoaderDisabled());
    const controlsRef = useRef({
        // Spread current values
        scale: transform.scale,
        posX: transform.position.x,
        posY: transform.position.y,
        posZ: transform.position.z,
        rotX: transform.rotation.x,
        rotY: transform.rotation.y,
        rotZ: transform.rotation.z,
        rotateSpeed: rotateSpeed,
    });

    useEffect(() => {
        // Create GUI
        const gui = new GUI({ title: '🎮 3D Model Controls' });
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = '80px';
        gui.domElement.style.right = '10px';
        gui.domElement.style.zIndex = '9999';
        guiRef.current = gui;

        const controls = controlsRef.current;

        // Helper to emit changes
        const emitChange = () => {
            onTransformChange({
                scale: controls.scale,
                position: {
                    x: controls.posX,
                    y: controls.posY,
                    z: controls.posZ,
                },
                rotation: {
                    x: controls.rotX,
                    y: controls.rotY,
                    z: controls.rotZ,
                },
            });
        };

        // === SCALE ===
        const scaleFolder = gui.addFolder('📐 Scale');
        scaleFolder.add(controls, 'scale', 10, 300, 1)
            .name('Scale')
            .onChange(emitChange);
        scaleFolder.open();

        // === POSITION ===
        const posFolder = gui.addFolder('📍 Position');
        posFolder.add(controls, 'posX', -2, 2, 0.01)
            .name('X (Left/Right)')
            .onChange(emitChange);
        posFolder.add(controls, 'posY', -2, 2, 0.01)
            .name('Y (Up/Down)')
            .onChange(emitChange);
        posFolder.add(controls, 'posZ', -5, 5, 0.01)
            .name('Z (Near/Far)')
            .onChange(emitChange);
        posFolder.open();

        // === ROTATION (DEGREES) ===
        const rotFolder = gui.addFolder('🔄 Rotation (Degrees)');
        rotFolder.add(controls, 'rotX', -180, 180, 0.1)
            .name('X (Tilt Forward/Back)')
            .onChange(emitChange);
        rotFolder.add(controls, 'rotY', -180, 180, 0.1)
            .name('Y (Turn Left/Right)')
            .onChange(emitChange);
        rotFolder.add(controls, 'rotZ', -180, 180, 0.1)
            .name('Z (Roll/Bank)')
            .onChange(emitChange);
        rotFolder.open();

        // === ANIMATION ===
        const animFolder = gui.addFolder('🎬 Animation');
        animFolder.add(controls, 'rotateSpeed', 0, 0.05, 0.001)
            .name('Spin Speed')
            .onChange((value: number) => {
                if (onRotateSpeedChange) {
                    onRotateSpeedChange(value);
                }
            });
        animFolder.open();

        // === COPY VALUES ===
        const copyFolder = gui.addFolder('📋 Copy to Config');
        copyFolder.add({
            copyConfig: () => {
                const config = `manualTransform: {
    scale: ${controls.scale},
    position: {
        x: ${controls.posX},
        y: ${controls.posY},
        z: ${controls.posZ}
    },
    rotation: {
        x: ${controls.rotX},
        y: ${controls.rotY},
        z: ${controls.rotZ}
    },
},

animation: {
    rotateSpeed: ${controls.rotateSpeed},
}`;
                navigator.clipboard.writeText(config);
                alert('✅ Config copied to clipboard!\n\nPaste into three-settings.ts');
                console.log('📋 Copy this to three-settings.ts:\n', config);
            }
        }, 'copyConfig').name('📋 Copy Config');
        copyFolder.open();

        // === SETTINGS ===
        const settingsFolder = gui.addFolder('⚙️ Settings');
        const loaderControl = { enabled: !isLoaderDisabled() };
        settingsFolder.add(loaderControl, 'enabled')
            .name('Loader Enabled')
            .onChange((value: boolean) => {
                if (value) {
                    enableLoader();
                    setLoaderEnabled(true);
                } else {
                    disableLoader();
                    setLoaderEnabled(false);
                }
            });
        settingsFolder.open();

        return () => {
            gui.destroy();
        };
    }, [onTransformChange, onRotateSpeedChange]);

    // Update controls when external props change (HMR)
    useEffect(() => {
        controlsRef.current.scale = transform.scale;
        controlsRef.current.posX = transform.position.x;
        controlsRef.current.posY = transform.position.y;
        controlsRef.current.posZ = transform.position.z;
        controlsRef.current.rotX = transform.rotation.x;
        controlsRef.current.rotY = transform.rotation.y;
        controlsRef.current.rotZ = transform.rotation.z;
        controlsRef.current.rotateSpeed = rotateSpeed;

        // Update GUI if it exists
        if (guiRef.current) {
            guiRef.current.controllers.forEach(c => c.updateDisplay());
            guiRef.current.folders.forEach(folder => {
                folder.controllers.forEach(c => c.updateDisplay());
            });
        }
    }, [transform, rotateSpeed]);

    return null; // This component only renders the GUI overlay
}
