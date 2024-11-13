import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '@/lib/i18n/i18n';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

const Language = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="language" className="text-right">
          {t('language')}
        </Label>
        <Select defaultValue={language} onValueChange={changeLanguage}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={t(`languages.${language}`)} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(t('languages')).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Language;
