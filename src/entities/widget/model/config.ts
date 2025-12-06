import type { WidgetConfig, WidgetType, WidgetInstance } from './types';

export const WIDGET_CONFIGS: Record<WidgetType, WidgetConfig> = {
    clock: {
        type: 'clock',
        name: 'Clock',
        description: 'Analog or digital clock widget',
        defaultSize: { width: 300, height: 300 },
        aspectRatio: 1, // Square
        minSize: { width: 200, height: 200 },
        maxSize: { width: 500, height: 500 },
        supportsColor: true,
        supportsTransparency: false,
    },
    todo: {
        type: 'todo',
        name: 'Todo List',
        description: 'Task management widget',
        defaultSize: { width: 320, height: 400 },
        aspectRatio: 0.8, // 4:5 ratio
        minSize: { width: 260, height: 325 },
        maxSize: { width: 400, height: 500 },
        supportsColor: true,
        supportsTransparency: true,
    },
    timer: {
        type: 'timer',
        name: 'Timer',
        description: 'Pomodoro timer widget',
        defaultSize: { width: 280, height: 320 },
        aspectRatio: 0.875, // 7:8 ratio
        minSize: { width: 240, height: 274 },
        maxSize: { width: 360, height: 411 },
        supportsColor: true,
        supportsTransparency: true,
    },
    calendar: {
        type: 'calendar',
        name: 'Calendar',
        description: 'Monthly calendar widget',
        defaultSize: { width: 340, height: 360 },
        aspectRatio: 0.944, // ~17:18 ratio
        minSize: { width: 280, height: 296 },
        maxSize: { width: 420, height: 445 },
        supportsColor: true,
        supportsTransparency: true,
    },
    bookmarks: {
        type: 'bookmarks',
        name: 'Bookmarks',
        description: 'Quick access bookmarks',
        defaultSize: { width: 300, height: 380 },
        aspectRatio: 0.789, // ~15:19 ratio
        minSize: { width: 250, height: 317 },
        maxSize: { width: 380, height: 482 },
        supportsColor: true,
        supportsTransparency: true,
    },
};

export function getWidgetConfig(type: WidgetType): WidgetConfig {
    return WIDGET_CONFIGS[type];
}

export function createWidgetInstance(
    type: WidgetType,
    position: { x: number; y: number },
    zIndex: number
): WidgetInstance {
    const config = getWidgetConfig(type);
    return {
        id: `${type}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type,
        position,
        size: config.defaultSize,
        settings: {},
        visible: true,
        zIndex,
    };
}
