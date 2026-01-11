import { useClock } from '../hooks/useClock';

interface DigitalClockProps {
    format24?: boolean;
    showSeconds?: boolean;
    color?: string;
}

export function DigitalClock({
    format24 = false,
    showSeconds = true,
    color = '#111827',
}: DigitalClockProps) {
    const { hours, minutes, seconds, date } = useClock();

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    // Convert to 12-hour format if needed
    const displayHours = format24 ? hours : hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const dateStr = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    return (
        <div className="flex flex-col items-center justify-center gap-[0.5em] p-[1.5em] bg-white rounded-2xl shadow-lg w-full h-full">
            <div
                className="font-bold tracking-wider"
                style={{ fontSize: '3.75em', color }}
            >
                {formatNumber(displayHours)}:{formatNumber(minutes)}
                {showSeconds && (
                    <span
                        className="text-gray-400"
                        style={{ fontSize: '0.67em' }}
                    >
                        :{formatNumber(seconds)}
                    </span>
                )}
                {!format24 && (
                    <span className="ml-[0.2em]" style={{ fontSize: '0.5em' }}>
                        {ampm}
                    </span>
                )}
            </div>
            <div className="text-gray-500" style={{ fontSize: '0.875em' }}>
                {dateStr}
            </div>
        </div>
    );
}
