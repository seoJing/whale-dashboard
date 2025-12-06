import { Settings } from 'lucide-react';
import { DashboardCanvas } from '@widgets/dashboard';
import { AddWidgetButton } from '@features/add-widget';
import { WidgetSettingsButton } from '@features/widget-settings';
import { SettingsModal } from '@features/settings';
import { WidgetSettingsPanel } from '@widgets/dashboard/ui/WidgetSettingsPanel';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { Button } from '@shared/ui/button';

export function SidebarPage() {
    const setSettingsOpen = useDashboardStore(
        (state) => state.setSettingsModalOpen
    );
    const isPanelOpen = useDashboardStore(
        (state) => state.widgetDetailSheetOpen
    );
    const setWidgetDetailSheetOpen = useDashboardStore(
        (state) => state.setWidgetDetailSheetOpen
    );
    const selectWidget = useDashboardStore((state) => state.selectWidget);

    const handleDashboardClick = () => {
        if (isPanelOpen) {
            setWidgetDetailSheetOpen(false);
            selectWidget(null);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col overflow-hidden">
            {/* Settings Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-6 right-6 z-(--z-floating-button) bg-white/90 hover:bg-white shadow-md"
                onClick={() => setSettingsOpen(true)}
            >
                <Settings className="w-5 h-5" />
            </Button>

            {/* Dashboard Container - maintains aspect ratio with black bars */}
            <div className="flex-1 flex items-start justify-center transition-all duration-300 ease-in-out">
                <div
                    className="relative bg-linear-to-br from-gray-50 to-gray-100 transition-all duration-300 ease-in-out"
                    style={{
                        width: '100vw',
                        height: '100vh',
                        transformOrigin: 'top center',
                        transform: isPanelOpen ? 'scale(0.55)' : 'scale(1)',
                    }}
                    onClick={handleDashboardClick}
                >
                    <div className="h-full w-full p-6">
                        <DashboardCanvas />
                        <AddWidgetButton />
                        <WidgetSettingsButton />
                    </div>
                </div>
            </div>

            {/* Settings Panel - 40% at bottom */}
            <WidgetSettingsPanel />

            <SettingsModal />
        </div>
    );
}
