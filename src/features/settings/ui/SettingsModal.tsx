import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@shared/ui/dialog';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { SettingsSidebar } from './SettingsSidebar';
import { SettingsContent } from './SettingsContent';

export type SettingsCategory = 'account' | 'widgets';

export function SettingsModal() {
    const open = useDashboardStore((state) => state.settingsModalOpen);
    const setOpen = useDashboardStore((state) => state.setSettingsModalOpen);
    const [selectedCategory, setSelectedCategory] =
        useState<SettingsCategory>('widgets');

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl h-[600px] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="flex h-[calc(600px-80px)]">
                    <SettingsSidebar
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <SettingsContent category={selectedCategory} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
