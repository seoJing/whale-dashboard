import { Clock, CheckSquare, Timer, Calendar, Bookmark } from 'lucide-react';
import type { WidgetType } from '@shared/types';
import { WIDGET_CONFIGS } from '@shared/types';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { Card } from '@shared/ui/card';

interface WidgetPickerProps {
    onSelect: () => void;
}

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

export function WidgetPicker({ onSelect }: WidgetPickerProps) {
    const addWidget = useDashboardStore((state) => state.addWidget);

    const handleSelectWidget = (type: WidgetType) => {
        addWidget(type);
        onSelect();
    };

    return (
        <div>
            <h3 className="font-semibold text-lg mb-3">Add Widget</h3>
            <div className="grid grid-cols-2 gap-3">
                {Object.values(WIDGET_CONFIGS).map((config) => {
                    const Icon = WIDGET_ICONS[config.type];
                    return (
                        <Card
                            key={config.type}
                            className="p-4 cursor-pointer hover:bg-accent hover:shadow-md transition-all group"
                            onClick={() => handleSelectWidget(config.type)}
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        {config.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {config.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
