import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';
import type { ClockSettings } from '../types';

interface ClockProps {
    settings?: ClockSettings;
    size?: { width: number; height: number };
}

export function Clock({ settings = {}, size }: ClockProps) {
    const mode = settings.mode || 'analog';
    const format24 = settings.format24 || false;
    const showSeconds = settings.showSeconds !== false;
    const color = settings.color;

    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{ fontSize: size ? `${size.width / 300}em` : '1em' }}
        >
            {mode === 'analog' ? (
                <AnalogClock color={color} showSeconds={showSeconds} />
            ) : (
                <DigitalClock
                    format24={format24}
                    showSeconds={showSeconds}
                    color={color}
                />
            )}
        </div>
    );
}
