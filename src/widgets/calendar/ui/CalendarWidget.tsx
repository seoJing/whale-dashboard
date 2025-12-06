import type { CalendarSettings } from '@entities/widget';

interface CalendarWidgetProps {
    settings?: CalendarSettings;
    size?: { width: number; height: number };
}

export function CalendarWidget({ settings = {}, size }: CalendarWidgetProps) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const color = settings.color || '#2563eb';
    const startWeekOn = settings.startWeekOn || 'sunday';
    const scale = size ? size.width / 340 : 1;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay =
        startWeekOn === 'monday'
            ? firstDay === 0
                ? 6
                : firstDay - 1
            : firstDay;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const weekDays =
        startWeekOn === 'monday'
            ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <div
                key={day}
                className={`h-8 flex items-center justify-center text-sm ${
                    day === currentDay
                        ? 'text-white rounded-full'
                        : 'text-gray-700'
                }`}
                style={day === currentDay ? { backgroundColor: color } : {}}
            >
                {day}
            </div>
        );
    }

    return (
        <div
            className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl h-full w-full"
            style={{ fontSize: `${scale}em` }}
        >
            <h2 className="text-lg font-semibold text-gray-800 text-center">
                {monthNames[currentMonth]} {currentYear}
            </h2>

            <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 text-center">
                {weekDays.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{days}</div>
        </div>
    );
}
