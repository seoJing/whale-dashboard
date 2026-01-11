import type { SettingsCategory } from './SettingsModal';
import { AccountSettings } from './AccountSettings';
import { WidgetList } from './WidgetList';
import { ScrollArea } from '@shared/ui/scroll-area';

interface SettingsContentProps {
    category: SettingsCategory;
}

export function SettingsContent({ category }: SettingsContentProps) {
    return (
        <ScrollArea className="flex-1">
            <div className="p-6">
                {category === 'account' && <AccountSettings />}
                {category === 'widgets' && <WidgetList />}
            </div>
        </ScrollArea>
    );
}
