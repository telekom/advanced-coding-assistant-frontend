import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { useTranslation } from 'react-i18next';
import { toggleDebugMode } from '@/redux/DebugModeSlice';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

const DebugToggle = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const debug = useAppSelector((state) => state.debugMode);

  const handleDebugMode = (value: boolean) => {
    dispatch(toggleDebugMode(value));
    localStorage.setItem('debug', value.toString());
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="language" className="text-right">
          {t('debug.title')}
        </Label>
        <Select onValueChange={(value) => handleDebugMode(value === 'true')}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={debug ? t(`debug.true`) : t(`debug.false`)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true"> {t(`debug.true`)}</SelectItem>
            <SelectItem value="false"> {t(`debug.false`)}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DebugToggle;
