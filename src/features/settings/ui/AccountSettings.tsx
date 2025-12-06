import { Label } from '@shared/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select';
import { Switch } from '@shared/ui/switch';
import { Separator } from '@shared/ui/separator';

export function AccountSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account preferences and settings
                </p>
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="ko">
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ko">한국어</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Choose your preferred language
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="theme">Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">
                            Enable dark theme for the dashboard
                        </p>
                    </div>
                    <Switch id="theme" />
                </div>
            </div>
        </div>
    );
}
