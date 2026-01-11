import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WidgetInstance, WidgetType } from '@shared/types';
import { createWidgetInstance, getWidgetConfig } from '@shared/types';
import type { ClockSettings } from '@features/clock/types';
import type { TodoSettings } from '@features/todo/types';
import type { TimerSettings } from '@features/timer/types';
import type { CalendarSettings } from '@features/calendar/types';
import type { BookmarksSettings } from '@features/bookmarks/types';

type WidgetSettings =
    | ClockSettings
    | TodoSettings
    | TimerSettings
    | CalendarSettings
    | BookmarksSettings;

// Widget type별 전역 설정
interface WidgetTypeSettings {
    clock: ClockSettings;
    todo: TodoSettings;
    timer: TimerSettings;
    calendar: CalendarSettings;
    bookmarks: BookmarksSettings;
}

interface DashboardState {
    widgets: WidgetInstance[];
    selectedWidgetId: string | null;
    settingsModalOpen: boolean;
    widgetDetailSheetOpen: boolean;
    // 위젯 타입별 전역 설정
    widgetTypeSettings: WidgetTypeSettings;

    // Actions
    addWidget: (type: WidgetType, position?: { x: number; y: number }) => void;
    updateWidget: (id: string, updates: Partial<WidgetInstance>) => void;
    deleteWidget: (id: string) => void;
    selectWidget: (id: string | null) => void;
    bringToFront: (id: string) => void;
    setSettingsModalOpen: (open: boolean) => void;
    setWidgetDetailSheetOpen: (open: boolean) => void;
    updateWidgetTypeSettings: (
        type: WidgetType,
        settings: Partial<WidgetSettings>
    ) => void;
    resetToDefaults: () => void;
}

const getDefaultWidgets = (): WidgetInstance[] => {
    return [createWidgetInstance('clock', { x: 50, y: 50 }, 1)];
};

const findEmptyPosition = (
    existingWidgets: WidgetInstance[],
    newWidgetSize: { width: number; height: number }
): { x: number; y: number } => {
    // Start from a reasonable position
    let x = 100;
    let y = 100;
    const step = 30;

    // Try to find a position that doesn't overlap too much
    for (let i = 0; i < 10; i++) {
        const overlaps = existingWidgets.some((widget) => {
            if (!widget.visible) return false;
            const xOverlap =
                x < widget.position.x + widget.size.width &&
                x + newWidgetSize.width > widget.position.x;
            const yOverlap =
                y < widget.position.y + widget.size.height &&
                y + newWidgetSize.height > widget.position.y;
            return xOverlap && yOverlap;
        });

        if (!overlaps) {
            return { x, y };
        }

        x += step;
        y += step;
    }

    // If we can't find a good position, just offset from the last widget
    return { x, y };
};

const getDefaultWidgetTypeSettings = (): WidgetTypeSettings => ({
    clock: {
        mode: 'analog',
        format24: false,
        showSeconds: true,
        color: '#1f2937',
    },
    todo: {
        color: '#2563eb',
        transparency: 0,
    },
    timer: {
        color: '#2563eb',
        transparency: 0,
        defaultDuration: 25,
    },
    calendar: {
        color: '#2563eb',
        transparency: 0,
        startWeekOn: 'sunday',
    },
    bookmarks: {
        color: '#2563eb',
        transparency: 0,
    },
});

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set, get) => ({
            widgets: getDefaultWidgets(),
            selectedWidgetId: null,
            settingsModalOpen: false,
            widgetDetailSheetOpen: false,
            widgetTypeSettings: getDefaultWidgetTypeSettings(),

            addWidget: (
                type: WidgetType,
                position?: { x: number; y: number }
            ) => {
                const state = get();
                const config = getWidgetConfig(type);
                const maxZ = Math.max(0, ...state.widgets.map((w) => w.zIndex));

                const finalPosition =
                    position ||
                    findEmptyPosition(state.widgets, config.defaultSize);

                const newWidget = createWidgetInstance(
                    type,
                    finalPosition,
                    maxZ + 1
                );

                set({
                    widgets: [...state.widgets, newWidget],
                    selectedWidgetId: newWidget.id,
                });
            },

            updateWidget: (id: string, updates: Partial<WidgetInstance>) => {
                set((state) => ({
                    widgets: state.widgets.map((w) =>
                        w.id === id ? { ...w, ...updates } : w
                    ),
                }));
            },

            deleteWidget: (id: string) => {
                set((state) => ({
                    widgets: state.widgets.filter((w) => w.id !== id),
                    selectedWidgetId:
                        state.selectedWidgetId === id
                            ? null
                            : state.selectedWidgetId,
                    // Keep settings panel open even after deletion
                }));
            },

            selectWidget: (id: string | null) => {
                set({
                    selectedWidgetId: id,
                });
            },

            bringToFront: (id: string) => {
                const state = get();
                const maxZ = Math.max(...state.widgets.map((w) => w.zIndex));
                const widget = state.widgets.find((w) => w.id === id);

                if (widget && widget.zIndex < maxZ) {
                    set({
                        widgets: state.widgets.map((w) =>
                            w.id === id ? { ...w, zIndex: maxZ + 1 } : w
                        ),
                    });
                }
            },

            setSettingsModalOpen: (open: boolean) => {
                set({ settingsModalOpen: open });
            },

            setWidgetDetailSheetOpen: (open: boolean) => {
                set({
                    widgetDetailSheetOpen: open,
                });
            },

            updateWidgetTypeSettings: (
                type: WidgetType,
                settings: Partial<WidgetSettings>
            ) => {
                set((state) => ({
                    widgetTypeSettings: {
                        ...state.widgetTypeSettings,
                        [type]: {
                            ...state.widgetTypeSettings[type],
                            ...settings,
                        },
                    },
                }));
            },

            resetToDefaults: () => {
                set({
                    widgets: getDefaultWidgets(),
                    selectedWidgetId: null,
                    settingsModalOpen: false,
                    widgetDetailSheetOpen: false,
                    widgetTypeSettings: getDefaultWidgetTypeSettings(),
                });
            },
        }),
        {
            name: 'whale-dashboard-state',
            version: 2, // Increment version for new schema
        }
    )
);

// Convenience selectors
export const useWidgets = () => useDashboardStore((state) => state.widgets);

export const useSelectedWidget = () => {
    const selectedId = useDashboardStore((state) => state.selectedWidgetId);
    const widgets = useDashboardStore((state) => state.widgets);
    return widgets.find((w) => w.id === selectedId) || null;
};
