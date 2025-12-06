import { Button } from '@shared/ui/button';
import { Label } from '@shared/ui/label';
import { Switch } from '@shared/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select';
import { Slider } from '@shared/ui/slider';
import { Trash2, X } from 'lucide-react';
import {
    useDashboardStore,
    useSelectedWidget,
} from '@shared/store/dashboard-store';
import { getWidgetConfig } from '@entities/widget';
import type {
    ClockSettings,
    TodoSettings,
    TimerSettings,
    CalendarSettings,
    BookmarksSettings,
} from '@entities/widget';

export function WidgetSettingsPanel() {
    const isOpen = useDashboardStore((state) => state.widgetDetailSheetOpen);
    const setOpen = useDashboardStore(
        (state) => state.setWidgetDetailSheetOpen
    );
    const selectedWidget = useSelectedWidget();
    const selectWidget = useDashboardStore((state) => state.selectWidget);
    const deleteWidget = useDashboardStore((state) => state.deleteWidget);
    const widgetTypeSettings = useDashboardStore(
        (state) => state.widgetTypeSettings
    );
    const updateWidgetTypeSettings = useDashboardStore(
        (state) => state.updateWidgetTypeSettings
    );
    const allWidgets = useDashboardStore((state) => state.widgets);

    if (!selectedWidget) return null;

    const config = getWidgetConfig(selectedWidget.type);
    const currentSettings = widgetTypeSettings[selectedWidget.type];

    const handleClose = () => {
        setOpen(false);
        selectWidget(null); // Deselect widget when closing
    };

    const handleDelete = () => {
        const currentId = selectedWidget.id;
        deleteWidget(currentId);

        // Select another widget after deletion
        const remainingWidgets = allWidgets.filter(
            (w) => w.visible && w.id !== currentId
        );
        if (remainingWidgets.length > 0) {
            selectWidget(remainingWidgets[0].id);
        }
    };

    const updateSettings = (updates: Partial<typeof currentSettings>) => {
        updateWidgetTypeSettings(selectedWidget.type, updates);
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ height: '40vh' }}
        >
            <div className="h-full flex flex-col p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            {config.name} 설정
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            이 타입의 모든 위젯에 적용되는 설정입니다
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Settings Content */}
                <div className="flex-1 space-y-6 overflow-y-auto">
                    {/* Clock Settings */}
                    {selectedWidget.type === 'clock' && (
                        <ClockSettingsPanel
                            settings={currentSettings as ClockSettings}
                            onUpdate={updateSettings}
                        />
                    )}

                    {/* Todo Settings */}
                    {selectedWidget.type === 'todo' && (
                        <CommonSettingsPanel
                            settings={currentSettings as TodoSettings}
                            onUpdate={updateSettings}
                            supportsTransparency={config.supportsTransparency}
                        />
                    )}

                    {/* Timer Settings */}
                    {selectedWidget.type === 'timer' && (
                        <>
                            <TimerSettingsPanel
                                settings={currentSettings as TimerSettings}
                                onUpdate={updateSettings}
                            />
                            <CommonSettingsPanel
                                settings={currentSettings as TimerSettings}
                                onUpdate={updateSettings}
                                supportsTransparency={
                                    config.supportsTransparency
                                }
                            />
                        </>
                    )}

                    {/* Calendar Settings */}
                    {selectedWidget.type === 'calendar' && (
                        <>
                            <CalendarSettingsPanel
                                settings={currentSettings as CalendarSettings}
                                onUpdate={updateSettings}
                            />
                            <CommonSettingsPanel
                                settings={currentSettings as CalendarSettings}
                                onUpdate={updateSettings}
                                supportsTransparency={
                                    config.supportsTransparency
                                }
                            />
                        </>
                    )}

                    {/* Bookmarks Settings */}
                    {selectedWidget.type === 'bookmarks' && (
                        <CommonSettingsPanel
                            settings={currentSettings as BookmarksSettings}
                            onUpdate={updateSettings}
                            supportsTransparency={config.supportsTransparency}
                        />
                    )}

                    {/* Delete Button */}
                    <div className="pt-4 border-t">
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="w-full"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            위젯 삭제
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Clock-specific settings
function ClockSettingsPanel({
    settings,
    onUpdate,
}: {
    settings: ClockSettings;
    onUpdate: (updates: Partial<ClockSettings>) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>시계 모드</Label>
                <Select
                    value={settings.mode || 'analog'}
                    onValueChange={(value: 'analog' | 'digital') =>
                        onUpdate({ mode: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="analog">아날로그</SelectItem>
                        <SelectItem value="digital">디지털</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="format24">24시간 형식</Label>
                <Switch
                    id="format24"
                    checked={settings.format24 || false}
                    onCheckedChange={(checked) =>
                        onUpdate({ format24: checked })
                    }
                />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="showSeconds">초 표시</Label>
                <Switch
                    id="showSeconds"
                    checked={settings.showSeconds !== false}
                    onCheckedChange={(checked) =>
                        onUpdate({ showSeconds: checked })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label>색상</Label>
                <input
                    type="color"
                    value={settings.color || '#000000'}
                    onChange={(e) => onUpdate({ color: e.target.value })}
                    className="w-full h-10 rounded-md border cursor-pointer"
                />
            </div>
        </div>
    );
}

// Timer-specific settings
function TimerSettingsPanel({
    settings,
    onUpdate,
}: {
    settings: TimerSettings;
    onUpdate: (updates: Partial<TimerSettings>) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>기본 타이머 시간 (분)</Label>
                <Select
                    value={String(settings.defaultDuration || 25)}
                    onValueChange={(value) =>
                        onUpdate({ defaultDuration: Number(value) })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5분</SelectItem>
                        <SelectItem value="15">15분</SelectItem>
                        <SelectItem value="25">25분 (Pomodoro)</SelectItem>
                        <SelectItem value="30">30분</SelectItem>
                        <SelectItem value="45">45분</SelectItem>
                        <SelectItem value="60">60분</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

// Calendar-specific settings
function CalendarSettingsPanel({
    settings,
    onUpdate,
}: {
    settings: CalendarSettings;
    onUpdate: (updates: Partial<CalendarSettings>) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>주 시작 요일</Label>
                <Select
                    value={settings.startWeekOn || 'sunday'}
                    onValueChange={(value: 'sunday' | 'monday') =>
                        onUpdate({ startWeekOn: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sunday">일요일</SelectItem>
                        <SelectItem value="monday">월요일</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

// Common settings (color, transparency)
function CommonSettingsPanel({
    settings,
    onUpdate,
    supportsTransparency,
}: {
    settings: { color?: string; transparency?: number };
    onUpdate: (
        updates: Partial<{ color?: string; transparency?: number }>
    ) => void;
    supportsTransparency: boolean;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>색상</Label>
                <input
                    type="color"
                    value={settings.color || '#3b82f6'}
                    onChange={(e) => onUpdate({ color: e.target.value })}
                    className="w-full h-10 rounded-md border cursor-pointer"
                />
            </div>

            {supportsTransparency && (
                <div className="space-y-2">
                    <Label>투명도: {settings.transparency || 0}%</Label>
                    <Slider
                        value={[settings.transparency || 0]}
                        onValueChange={([value]) =>
                            onUpdate({ transparency: value })
                        }
                        max={100}
                        step={5}
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
}
