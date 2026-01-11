import { useClock } from '../hooks/useClock';

interface AnalogClockProps {
    color?: string;
    showSeconds?: boolean;
}

export function AnalogClock({
    color = '#1f2937',
    showSeconds = true,
}: AnalogClockProps) {
    const { hours, minutes, seconds } = useClock();

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="relative w-full h-full max-w-48 max-h-48 aspect-square rounded-full border-4 border-gray-200 bg-white shadow-lg">
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-[0.25em] h-[0.75em] bg-gray-400 left-1/2 top-[0.5em] origin-center"
                    style={{
                        transform: `translateX(-50%) rotate(${
                            i * 30
                        }deg) translateY(1.25em)`,
                    }}
                />
            ))}

            {/* Hour hand */}
            <div
                className="absolute w-[0.375em] h-[3.5em] left-1/2 top-1/2 origin-bottom rounded-full"
                style={{
                    transform: `translateX(-50%) translateY(-100%) rotate(${hourDegrees}deg)`,
                    backgroundColor: color,
                }}
            />

            {/* Minute hand */}
            <div
                className="absolute w-[0.25em] h-[5em] left-1/2 top-1/2 origin-bottom rounded-full"
                style={{
                    transform: `translateX(-50%) translateY(-100%) rotate(${minuteDegrees}deg)`,
                    backgroundColor: color,
                    opacity: 0.8,
                }}
            />

            {/* Second hand */}
            {showSeconds && (
                <div
                    className="absolute w-[0.125em] h-[6em] bg-red-500 left-1/2 top-1/2 origin-bottom"
                    style={{
                        transform: `translateX(-50%) translateY(-100%) rotate(${secondDegrees}deg)`,
                    }}
                />
            )}

            {/* Center dot */}
            <div
                className="absolute w-[0.75em] h-[0.75em] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}
