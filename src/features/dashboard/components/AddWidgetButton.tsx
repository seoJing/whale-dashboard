import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { WidgetPicker } from './WidgetPicker';

export function AddWidgetButton() {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="lg"
                    className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-shadow z-(--z-floating-button)"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="top" align="start">
                <WidgetPicker onSelect={() => setOpen(false)} />
            </PopoverContent>
        </Popover>
    );
}
