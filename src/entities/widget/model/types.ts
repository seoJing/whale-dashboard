export type WidgetType = 'clock' | 'todo' | 'timer' | 'calendar' | 'bookmarks';

export interface ClockSettings {
    mode?: 'analog' | 'digital';
    format24?: boolean;
    color?: string;
    showSeconds?: boolean;
}

export interface TodoSettings {
    color?: string;
    transparency?: number;
}

export interface TimerSettings {
    color?: string;
    transparency?: number;
    defaultDuration?: number; // minutes
}

export interface CalendarSettings {
    color?: string;
    transparency?: number;
    startWeekOn?: 'sunday' | 'monday';
}

export interface BookmarksSettings {
    color?: string;
    transparency?: number;
}

export type WidgetSettings =
    | ClockSettings
    | TodoSettings
    | TimerSettings
    | CalendarSettings
    | BookmarksSettings;

export interface WidgetInstance {
    id: string;
    type: WidgetType;
    position: { x: number; y: number };
    size: { width: number; height: number };
    settings: WidgetSettings;
    visible: boolean;
    zIndex: number;
}

export interface WidgetConfig {
    type: WidgetType;
    name: string;
    description: string;
    defaultSize: { width: number; height: number };
    aspectRatio: number; // width / height
    minSize: { width: number; height: number };
    maxSize: { width: number; height: number };
    supportsColor: boolean;
    supportsTransparency: boolean;
}
