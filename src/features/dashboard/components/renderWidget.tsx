import type { WidgetInstance } from '@shared/types';
import type { ClockSettings } from '@features/clock/types';
import type { TodoSettings } from '@features/todo/types';
import type { TimerSettings } from '@features/timer/types';
import type { CalendarSettings } from '@features/calendar/types';
import type { BookmarksSettings } from '@features/bookmarks/types';
import { Clock } from '@features/clock';
import { TodoWidget } from '@features/todo';
import { TimerWidget } from '@features/timer';
import { CalendarWidget } from '@features/calendar';
import { BookmarksWidget } from '@features/bookmarks';
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
