import { useTranslation } from 'react-i18next';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { useTheme } from '../provider/ThemeProvider';
import { MonitorCog, Moon, Sun } from 'lucide-react';

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const handleThemeChange = (theme: string) => {
    switch (theme) {
      case 'light':
        setTheme('light');
        return t('light');
      case 'dark':
        setTheme('dark');
        return t('dark');
      default:
        setTheme('system');
        return t('system');
    }
  };
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="theme" className="text-right">
          {t('theme')}
        </Label>
        <Select defaultValue={theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center justify-between gap-2">
                {t('light')}
                <Sun className="h-4 w-4" />
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center justify-between gap-2">
                {t('dark')}
                <Moon className="h-4 w-4" />
              </div>
            </SelectItem>
            <SelectItem value="system">
              <div className="flex items-center justify-between gap-2">
                {t('system')}
                <MonitorCog className="h-4 w-4" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Theme;
