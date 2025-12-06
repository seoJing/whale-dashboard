import {
    Clock,
    CheckSquare,
    Timer,
    Calendar,
    Bookmark,
    Trash2,
    Eye,
    EyeOff,
} from 'lucide-react';
import type { WidgetType } from '@entities/widget';
import { getWidgetConfig } from '@entities/widget';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { Button } from '@shared/ui/button';
import { Separator } from '@shared/ui/separator';

const WIDGET_ICONS: Record<
    WidgetType,
    React.ComponentType<{ className?: string }>
> = {
    clock: Clock,
    todo: CheckSquare,
    timer: Timer,
    calendar: Calendar,
    bookmarks: Bookmark,
};

export function WidgetList() {
    const widgets = useDashboardStore((state) => state.widgets);
    const updateWidget = useDashboardStore((state) => state.updateWidget);
    const deleteWidget = useDashboardStore((state) => state.deleteWidget);

    if (widgets.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Widgets</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your dashboard widgets
                    </p>
                </div>
                <Separator />
                <div className="text-center py-12 text-muted-foreground">
                    <p>No widgets added yet</p>
                    <p className="text-sm mt-2">
                        Click the + button to add your first widget
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Widgets</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your dashboard widgets - toggle visibility or remove
                    them
                </p>
            </div>

            <Separator />

            <div className="space-y-3">
                {widgets.map((widget) => {
                    const config = getWidgetConfig(widget.type);
                    const Icon = WIDGET_ICONS[widget.type];

                    return (
                        <div
                            key={widget.id}
                            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">{config.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {Math.round(widget.size.width)} ×{' '}
                                        {Math.round(widget.size.height)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        updateWidget(widget.id, {
                                            visible: !widget.visible,
                                        })
                                    }
                                    title={
                                        widget.visible
                                            ? 'Hide widget'
                                            : 'Show widget'
                                    }
                                >
                                    {widget.visible ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteWidget(widget.id)}
                                    title="Delete widget"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
