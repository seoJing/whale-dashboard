import { useState, useEffect, useRef } from 'react';

export function useTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer finished
                        setIsRunning(false);
                        // Switch mode and reset
                        const newMode = mode === 'work' ? 'break' : 'work';
                        setMode(newMode);
                        setMinutes(newMode === 'work' ? 25 : 5);
                        setSeconds(0);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, minutes, seconds, mode]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setMinutes(mode === 'work' ? 25 : 5);
        setSeconds(0);
    };

    const switchMode = () => {
        const newMode = mode === 'work' ? 'break' : 'work';
        setMode(newMode);
        setMinutes(newMode === 'work' ? 25 : 5);
        setSeconds(0);
        setIsRunning(false);
    };

    return {
        minutes,
        seconds,
        isRunning,
        mode,
        start,
        pause,
        reset,
        switchMode,
    };
}
