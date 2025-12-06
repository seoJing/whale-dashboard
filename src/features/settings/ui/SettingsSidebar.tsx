import { User, Grid3x3 } from 'lucide-react';
import type { SettingsCategory } from './SettingsModal';
import { cn } from '@shared/lib/utils';

interface SettingsSidebarProps {
    selectedCategory: SettingsCategory;
    onSelectCategory: (category: SettingsCategory) => void;
}

const CATEGORIES = [
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'widgets' as const, label: 'Widgets', icon: Grid3x3 },
];

export function SettingsSidebar({
    selectedCategory,
    onSelectCategory,
}: SettingsSidebarProps) {
    return (
        <div className="w-64 border-r bg-muted/30 p-4">
            <nav className="space-y-1">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.id)}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                                isSelected
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">
                                {category.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
