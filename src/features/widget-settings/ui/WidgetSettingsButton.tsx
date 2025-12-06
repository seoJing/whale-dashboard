import { Settings2 } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { useDashboardStore } from '@shared/store/dashboard-store';

export function WidgetSettingsButton() {
    const widgets = useDashboardStore((state) => state.widgets);
    const setWidgetDetailSheetOpen = useDashboardStore(
        (state) => state.setWidgetDetailSheetOpen
    );
    const selectWidget = useDashboardStore((state) => state.selectWidget);

    const handleClick = () => {
        // Select the first visible widget and open settings
        const visibleWidgets = widgets.filter((w) => w.visible);
        if (visibleWidgets.length > 0) {
            selectWidget(visibleWidgets[0].id);
            setWidgetDetailSheetOpen(true);
        }
    };

    return (
        <Button
            size="lg"
            className="fixed bottom-6 left-24 rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-shadow z-(--z-floating-button) bg-blue-500 hover:bg-blue-600"
            onClick={handleClick}
        >
            <Settings2 className="w-6 h-6" />
        </Button>
    );
}
