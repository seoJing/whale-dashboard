import type {
    WidgetInstance,
    ClockSettings,
    TodoSettings,
    TimerSettings,
    CalendarSettings,
    BookmarksSettings,
} from '@entities/widget';
import { Clock } from '@widgets/clock';
import { TodoWidget } from '@widgets/todo';
import { TimerWidget } from '@widgets/timer';
import { CalendarWidget } from '@widgets/calendar';
import { BookmarksWidget } from '@widgets/bookmarks';
import { useDashboardStore } from '@shared/store/dashboard-store';

interface RenderWidgetProps {
    widget: WidgetInstance;
}

export function RenderWidget({ widget }: RenderWidgetProps) {
    const { type, size } = widget;
    const widgetTypeSettings = useDashboardStore(
        (state) => state.widgetTypeSettings
    );
    const settings = widgetTypeSettings[type];

    const transparency = 'transparency' in settings ? settings.transparency : 0;

    // Container style with transparency
    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        opacity: transparency ? 1 - transparency / 100 : 1,
    };

    return (
        <div style={containerStyle}>
            {type === 'clock' && (
                <Clock settings={settings as ClockSettings} size={size} />
            )}
            {type === 'todo' && (
                <TodoWidget settings={settings as TodoSettings} size={size} />
            )}
            {type === 'timer' && (
                <TimerWidget settings={settings as TimerSettings} size={size} />
            )}
            {type === 'calendar' && (
                <CalendarWidget
                    settings={settings as CalendarSettings}
                    size={size}
                />
            )}
            {type === 'bookmarks' && (
                <BookmarksWidget
                    settings={settings as BookmarksSettings}
                    size={size}
                />
            )}
            {!['clock', 'todo', 'timer', 'calendar', 'bookmarks'].includes(
                type
            ) && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Unknown widget type</p>
                </div>
            )}
        </div>
    );
}
