import { t } from 'i18next';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { useFont } from '../provider/FontProvider';

const FontSize = () => {
  const { font, setFont } = useFont();

  const handleFontSizeChange = (value: string) => {
    switch (value) {
      case 'small':
        setFont('small');
        return t('small');
      case 'large':
        setFont('large');
        return t('large');
      default:
        setFont('medium');
        return t('medium');
    }
  };
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="fontSize" className="text-right">
        {t('fontSize')}
      </Label>
      <Select defaultValue={font} onValueChange={handleFontSizeChange}>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Select a font size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="small"> {t('small')}</SelectItem>
          <SelectItem value="medium"> {t('medium')}</SelectItem>
          <SelectItem value="large"> {t('large')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSize;
