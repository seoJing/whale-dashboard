import { useTimer } from '../hooks/useTimer';
import type { TimerSettings } from '../types';

interface TimerWidgetProps {
    settings?: TimerSettings;
    size?: { width: number; height: number };
}

export function TimerWidget({ settings = {}, size }: TimerWidgetProps) {
    const {
        minutes,
        seconds,
        isRunning,
        mode,
        start,
        pause,
        reset,
        switchMode,
    } = useTimer();

    const color = settings.color || '#2563eb';
    const scale = size ? size.width / 280 : 1;

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <div
            className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl h-full w-full"
            style={{ fontSize: `${scale}em` }}
        >
            <div className="flex gap-2">
                <button
                    onClick={switchMode}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        mode === 'work'
                            ? 'text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                    style={mode === 'work' ? { backgroundColor: color } : {}}
                >
                    Work
                </button>
                <button
                    onClick={switchMode}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        mode === 'break'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    Break
                </button>
            </div>

            <div
                className="font-bold text-gray-800 tracking-wider"
                style={{ fontSize: '3.75em' }}
            >
                {formatTime(minutes)}:{formatTime(seconds)}
            </div>

            <div className="flex gap-2">
                {!isRunning ? (
                    <button
                        onClick={start}
                        className="px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors"
                        style={{ backgroundColor: color }}
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={pause}
                        className="px-6 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Pause
                    </button>
                )}
                <button
                    onClick={reset}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
