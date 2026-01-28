/**
 * Advanced Debug Panel
 * Shows compilation status, component load times, and console logs
 */

import { useEffect, useState, useRef } from 'react';

interface LogEntry {
    timestamp: number;
    level: 'info' | 'warn' | 'error' | 'success';
    message: string;
    component?: string;
}

export default function DebugPanel() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const [componentLoadTimes, setComponentLoadTimes] = useState<Record<string, number>>({});
    const startTimeRef = useRef<number>(Date.now());
    const componentTimersRef = useRef<Record<string, number>>({});
    const logCountRef = useRef<number>(0);

    // Add log function
    const addLog = (level: LogEntry['level'], message: string, component?: string) => {
        // Throttle logs to prevent WebSocket payload issues
        logCountRef.current += 1;
        if (logCountRef.current > 100) {
            // Too many logs, skip to prevent issues
            return;
        }
        
        // Limit message length to prevent payload issues
        const maxLength = 300;
        const truncatedMessage = message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
        
        const entry: LogEntry = {
            timestamp: Date.now(),
            level,
            message: truncatedMessage,
            component,
        };
        setLogs((prev) => [...prev, entry].slice(-30)); // Keep last 30 logs (reduced from 50)
        
        // Don't log to console to avoid feedback loops with HMR
        // console.log(`[${level.toUpperCase()}]${component ? ` [${component}]` : ''} ${truncatedMessage}`);
    };

    // Track component load time
    const startComponentTimer = (componentName: string) => {
        componentTimersRef.current[componentName] = Date.now();
        addLog('info', `Starting to load: ${componentName}`, componentName);
    };

    const endComponentTimer = (componentName: string) => {
        const startTime = componentTimersRef.current[componentName];
        if (startTime) {
            const loadTime = Date.now() - startTime;
            setComponentLoadTimes((prev) => ({ ...prev, [componentName]: loadTime }));
            addLog('success', `Loaded in ${loadTime}ms`, componentName);
            delete componentTimersRef.current[componentName];
        }
    };

    // Expose to window for global access
    useEffect(() => {
        (window as any).debugPanel = {
            log: (level: LogEntry['level'], message: string, component?: string) => {
                addLog(level, message, component);
            },
            startTimer: startComponentTimer,
            endTimer: endComponentTimer,
            addLog,
        };

        addLog('success', 'Debug Panel initialized', 'DebugPanel');
        addLog('info', `Page load time: ${Date.now() - startTimeRef.current}ms`, 'Page');

        return () => {
            delete (window as any).debugPanel;
        };
    }, []);

    // Monitor console - DISABLED to prevent WebSocket payload issues
    // Only log explicit calls to debugPanel.log()
    // useEffect(() => {
    //     const originalLog = console.log;
    //     const originalWarn = console.warn;
    //     const originalError = console.error;

    //     console.log = (...args: any[]) => {
    //         originalLog(...args);
    //         const message = args.map((a) => {
    //             if (typeof a === 'object') {
    //                 try {
    //                     return JSON.stringify(a).substring(0, 200);
    //                 } catch {
    //                     return String(a).substring(0, 200);
    //                 }
    //             }
    //             return String(a).substring(0, 200);
    //         }).join(' ');
    //         if (message.length < 500) { // Only log short messages
    //             addLog('info', message);
    //         }
    //     };

    //     console.warn = (...args: any[]) => {
    //         originalWarn(...args);
    //         const message = args.map((a) => {
    //             if (typeof a === 'object') {
    //                 try {
    //                     return JSON.stringify(a).substring(0, 200);
    //                 } catch {
    //                     return String(a).substring(0, 200);
    //                 }
    //             }
    //             return String(a).substring(0, 200);
    //         }).join(' ');
    //         if (message.length < 500) {
    //             addLog('warn', message);
    //         }
    //     };

    //     console.error = (...args: any[]) => {
    //         originalError(...args);
    //         const message = args.map((a) => {
    //             if (typeof a === 'object') {
    //                 try {
    //                     return JSON.stringify(a).substring(0, 200);
    //                 } catch {
    //                     return String(a).substring(0, 200);
    //                 }
    //             }
    //             return String(a).substring(0, 200);
    //         }).join(' ');
    //         if (message.length < 500) {
    //             addLog('error', message);
    //         }
    //     };

    //     return () => {
    //         console.log = originalLog;
    //         console.warn = originalWarn;
    //         console.error = originalError;
    //     };
    // }, []);

    const clearLogs = () => {
        setLogs([]);
        logCountRef.current = 0; // Reset log counter
        // Don't call addLog here to avoid recursion
    };

    const getLevelColor = (level: LogEntry['level']) => {
        switch (level) {
            case 'error':
                return '#ef4444';
            case 'warn':
                return '#f59e0b';
            case 'success':
                return '#10b981';
            default:
                return '#3b82f6';
        }
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 });
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 99999,
                    padding: '10px 15px',
                    background: '#1f2937',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}
            >
                🐛 Debug
            </button>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '500px',
                maxHeight: '600px',
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'monospace',
                fontSize: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '12px 16px',
                    background: '#111827',
                    borderBottom: '1px solid #374151',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>🐛</span>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>Debug Panel</span>
                    <span style={{ color: '#9ca3af', fontSize: '10px' }}>({logs.length} logs)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={clearLogs}
                        style={{
                            padding: '4px 8px',
                            background: '#374151',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '10px',
                        }}
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            padding: '4px 8px',
                            background: '#374151',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '10px',
                        }}
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Component Load Times */}
            {Object.keys(componentLoadTimes).length > 0 && (
                <div
                    style={{
                        padding: '12px 16px',
                        background: '#111827',
                        borderBottom: '1px solid #374151',
                    }}
                >
                    <div style={{ color: '#9ca3af', fontSize: '10px', marginBottom: '8px', fontWeight: 'bold' }}>
                        Component Load Times:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {Object.entries(componentLoadTimes)
                            .sort(([, a], [, b]) => b - a)
                            .map(([component, time]) => (
                                <div key={component} style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                    <span>{component}:</span>
                                    <span style={{ color: time > 1000 ? '#ef4444' : time > 500 ? '#f59e0b' : '#10b981' }}>
                                        {time}ms
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Logs */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '8px',
                    maxHeight: '400px',
                }}
            >
                {logs.length === 0 ? (
                    <div style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>No logs yet...</div>
                ) : (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '6px 8px',
                                marginBottom: '4px',
                                background: index % 2 === 0 ? '#111827' : 'transparent',
                                borderRadius: '4px',
                                borderLeft: `3px solid ${getLevelColor(log.level)}`,
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#9ca3af', fontSize: '10px', minWidth: '70px' }}>
                                    {formatTime(log.timestamp)}
                                </span>
                                <span
                                    style={{
                                        color: getLevelColor(log.level),
                                        fontWeight: 'bold',
                                        minWidth: '60px',
                                        fontSize: '10px',
                                    }}
                                >
                                    [{log.level.toUpperCase()}]
                                </span>
                                {log.component && (
                                    <span style={{ color: '#a78bfa', fontSize: '10px', minWidth: '100px' }}>
                                        [{log.component}]
                                    </span>
                                )}
                                <span style={{ color: 'white', flex: 1, wordBreak: 'break-word' }}>{log.message}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
