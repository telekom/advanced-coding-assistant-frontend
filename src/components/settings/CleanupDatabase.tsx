import { useTranslation } from 'react-i18next';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { toast } from '@/lib/use-toast';
import { del } from '@/util/GlobalMethods';

const CleanupDatabase = () => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    let response;
    response = await del("/graphdb/cleanup", {});
    
    if(response.error) {
        toast({
            variant: 'destructive',
            title: `${t('error')}`,
            description: `${t('cleanup.deleteFailed')}: ${response.statusText}`,
        });
        return;
    }
    toast({
        variant: 'default',
        title: `${t('success')}`,
        description: `${t('cleanup.deleteSuccessful')}`,
        duration: Infinity,
    });
  };   

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="language" className="text-right">
          {t('cleanup.title')}
        </Label>
        <Button onClick={handleDelete}>{t('cleanup.reset')}</Button>
      </div>
    </div>
  );
};

export default CleanupDatabase;