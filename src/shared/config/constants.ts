export const APP_NAME = 'Whale Dashboard';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
    TODOS: 'todos',
    BOOKMARKS: 'bookmarks',
    THEME: 'theme',
    CLOCK_MODE: 'clock_mode',
} as const;

export const TIMER_PRESETS = {
    WORK: 25 * 60, // 25 minutes in seconds
    SHORT_BREAK: 5 * 60, // 5 minutes
    LONG_BREAK: 15 * 60, // 15 minutes
} as const;
