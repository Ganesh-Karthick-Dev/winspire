/**
 * Model Debug Panel
 * 
 * Comprehensive Leva-based debug UI similar to Santhi-Gears.
 * Features smooth GSAP-powered transitions and properly synced controls.
 */

'use client';

import { useControls, button, useStoreContext } from 'leva';
import { useEffect, useRef, useCallback } from 'react';
import { scrollKeyframes, animationSettings } from '@/lib/scrollAnimations';
import gsap from 'gsap';

export interface ModelTransformValues {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: number;
}

interface ModelDebugPanelProps {
    transform: ModelTransformValues;
    onTransformChange: (transform: ModelTransformValues) => void;
    rotateSpeed?: number;
    onRotateSpeedChange?: (speed: number) => void;
}

export default function ModelDebugPanel({
    transform,
    onTransformChange,
    rotateSpeed = 0,
    onRotateSpeedChange,
}: ModelDebugPanelProps) {
    const transformRef = useRef(transform);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const isInternalUpdate = useRef(false);

    useEffect(() => {
        transformRef.current = transform;
    }, [transform]);

    // Get Leva store context for programmatic updates
    const store = useStoreContext();

    // Sync sliders to current transform (when buttons change values)
    const syncSlidersToTransform = useCallback((t: ModelTransformValues) => {
        if (!store) return;

        isInternalUpdate.current = true;

        // Update all slider values in Leva store
        store.setValueAtPath('Position (Fine).x', t.position.x, false);
        store.setValueAtPath('Position (Fine).y', t.position.y, false);
        store.setValueAtPath('Position (Fine).z', t.position.z, false);
        store.setValueAtPath('Rotation (Fine).x', t.rotation.x, false);
        store.setValueAtPath('Rotation (Fine).y', t.rotation.y, false);
        store.setValueAtPath('Rotation (Fine).z', t.rotation.z, false);
        store.setValueAtPath('Scale (Fine).scale', t.scale, false);

        setTimeout(() => {
            isInternalUpdate.current = false;
        }, 50);
    }, [store]);

    // Smooth animated transition to a target transform
    const animateToTransform = useCallback((target: ModelTransformValues, duration = 0.8) => {
        if (animationRef.current) {
            animationRef.current.kill();
        }

        const proxy = {
            px: transformRef.current.position.x,
            py: transformRef.current.position.y,
            pz: transformRef.current.position.z,
            rx: transformRef.current.rotation.x,
            ry: transformRef.current.rotation.y,
            rz: transformRef.current.rotation.z,
            scale: transformRef.current.scale,
        };

        animationRef.current = gsap.to(proxy, {
            px: target.position.x,
            py: target.position.y,
            pz: target.position.z,
            rx: target.rotation.x,
            ry: target.rotation.y,
            rz: target.rotation.z,
            scale: target.scale,
            duration,
            ease: 'power2.inOut',
            onUpdate: () => {
                const newTransform = {
                    position: { x: proxy.px, y: proxy.py, z: proxy.pz },
                    rotation: { x: proxy.rx, y: proxy.ry, z: proxy.rz },
                    scale: proxy.scale,
                };
                onTransformChange(newTransform);
                syncSlidersToTransform(newTransform);
            },
        });
    }, [onTransformChange, syncSlidersToTransform]);

    // Instant update with slider sync
    const updateTransform = useCallback((updates: Partial<ModelTransformValues>) => {
        const current = transformRef.current;
        const newTransform = {
            position: { ...current.position, ...updates.position },
            rotation: { ...current.rotation, ...updates.rotation },
            scale: updates.scale ?? current.scale,
        };
        onTransformChange(newTransform);
        syncSlidersToTransform(newTransform);
    }, [onTransformChange, syncSlidersToTransform]);

    // ========================================
    // SCROLL TRANSITION PRESETS
    // ========================================
    const presetButtons: Record<string, ReturnType<typeof button>> = {};
    scrollKeyframes.forEach((keyframe, index) => {
        const label = keyframe.label || `keyframe_${index}`;
        presetButtons[label] = button(() => {
            console.log(`🎯 Animating to: ${label}`);
            animateToTransform({
                position: { ...keyframe.transform.position },
                rotation: { ...keyframe.transform.rotation },
                scale: keyframe.transform.scale,
            }, animationSettings.smoothTime);
        });
    });

    useControls('OnScrollTransitions', presetButtons);

    // ========================================
    // HELPER
    // ========================================
    useControls('Helper', {
        'Log Coordinates': button(() => {
            const t = transformRef.current;
            console.log('📍 Current Transform:');
            console.log(`Position: { x: ${t.position.x.toFixed(3)}, y: ${t.position.y.toFixed(3)}, z: ${t.position.z.toFixed(3)} }`);
            console.log(`Rotation: { x: ${t.rotation.x.toFixed(3)}, y: ${t.rotation.y.toFixed(3)}, z: ${t.rotation.z.toFixed(3)} }`);
            console.log(`Scale: ${t.scale}`);
        }),
        'Copy as Keyframe': button(() => {
            const t = transformRef.current;
            const keyframe = {
                scrollProgress: 0,
                label: 'TODO',
                transform: {
                    position: { x: +t.position.x.toFixed(3), y: +t.position.y.toFixed(3), z: +t.position.z.toFixed(3) },
                    rotation: { x: +t.rotation.x.toFixed(3), y: +t.rotation.y.toFixed(3), z: +t.rotation.z.toFixed(3) },
                    scale: t.scale,
                },
            };
            navigator.clipboard.writeText(JSON.stringify(keyframe, null, 4));
            console.log('📋 Copied to clipboard!');
        }),
    });

    // ========================================
    // SETTINGS
    // ========================================
    useControls('Settings', {
        smoothTime: {
            value: animationSettings.smoothTime,
            min: 0.1,
            max: 2,
            step: 0.1
        },
        rotateSpeed: {
            value: rotateSpeed,
            min: 0,
            max: 0.05,
            step: 0.001,
            onChange: (v) => onRotateSpeedChange?.(v),
        },
    });

    // ========================================
    // DOLLY
    // ========================================
    useControls('Dolly', {
        in: button(() => updateTransform({ scale: transformRef.current.scale + 10 })),
        out: button(() => updateTransform({ scale: Math.max(10, transformRef.current.scale - 10) })),
    });

    // ========================================
    // TRUCK
    // ========================================
    useControls('Truck', {
        up: button(() => updateTransform({ position: { ...transformRef.current.position, y: transformRef.current.position.y + 0.2 } })),
        down: button(() => updateTransform({ position: { ...transformRef.current.position, y: transformRef.current.position.y - 0.2 } })),
        left: button(() => updateTransform({ position: { ...transformRef.current.position, x: transformRef.current.position.x - 0.2 } })),
        right: button(() => updateTransform({ position: { ...transformRef.current.position, x: transformRef.current.position.x + 0.2 } })),
        forward: button(() => updateTransform({ position: { ...transformRef.current.position, z: transformRef.current.position.z + 0.2 } })),
        backward: button(() => updateTransform({ position: { ...transformRef.current.position, z: transformRef.current.position.z - 0.2 } })),
    });

    // ========================================
    // ROTATE
    // ========================================
    useControls('Rotate', {
        'pitch up': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, x: transformRef.current.rotation.x + 5 } })),
        'pitch down': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, x: transformRef.current.rotation.x - 5 } })),
        'yaw left': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, y: transformRef.current.rotation.y - 5 } })),
        'yaw right': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, y: transformRef.current.rotation.y + 5 } })),
        'roll left': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, z: transformRef.current.rotation.z - 5 } })),
        'roll right': button(() => updateTransform({ rotation: { ...transformRef.current.rotation, z: transformRef.current.rotation.z + 5 } })),
    });

    // ========================================
    // FINE CONTROLS (Sliders)
    // ========================================
    const [positionControls, setPosition] = useControls('Position (Fine)', () => ({
        x: { value: transform.position.x, min: -5, max: 5, step: 0.01 },
        y: { value: transform.position.y, min: -5, max: 5, step: 0.01 },
        z: { value: transform.position.z, min: -5, max: 5, step: 0.01 },
    }));

    const [rotationControls, setRotation] = useControls('Rotation (Fine)', () => ({
        x: { value: transform.rotation.x, min: -180, max: 180, step: 0.1 },
        y: { value: transform.rotation.y, min: -180, max: 180, step: 0.1 },
        z: { value: transform.rotation.z, min: -180, max: 180, step: 0.1 },
    }));

    const [scaleControls, setScale] = useControls('Scale (Fine)', () => ({
        scale: { value: transform.scale, min: 10, max: 300, step: 1 },
    }));

    // Sync sliders → parent (when user moves sliders directly)
    useEffect(() => {
        if (isInternalUpdate.current) return;

        onTransformChange({
            position: { x: positionControls.x, y: positionControls.y, z: positionControls.z },
            rotation: { x: rotationControls.x, y: rotationControls.y, z: rotationControls.z },
            scale: scaleControls.scale,
        });
    }, [
        positionControls.x, positionControls.y, positionControls.z,
        rotationControls.x, rotationControls.y, rotationControls.z,
        scaleControls.scale,
        onTransformChange,
    ]);

    // Sync parent → sliders (when buttons/animation change values)
    useEffect(() => {
        setPosition({ x: transform.position.x, y: transform.position.y, z: transform.position.z });
        setRotation({ x: transform.rotation.x, y: transform.rotation.y, z: transform.rotation.z });
        setScale({ scale: transform.scale });
    }, [transform, setPosition, setRotation, setScale]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (animationRef.current) animationRef.current.kill();
        };
    }, []);

    return null;
}
