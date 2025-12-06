import { useState, useEffect } from 'react';

export function useClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        date: time,
    };
}
