import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '@/lib/use-toast';
import { useTranslation } from 'react-i18next';
import { post, put } from '@/util/GlobalMethods';
import { Label } from '../ui/Label';

const Repository = () => {
  const { t } = useTranslation();
  const [repositoryPath, setRepositoryPath] = useState(localStorage.getItem('repositoryPath') || '');

  const handleUpload = async () => {
    if (repositoryPath) {
      let response;
      toast({
        variant: 'default',
        title: `${t('uploading')}...`,
        description: `${t('repositoryUploading')}`,
        duration: Infinity,
      });
      if (repositoryPath.includes(':') || repositoryPath.includes('/')) {
        response = await post('/repositories/local', repositoryPath, {}, 'text/plain');
      } else {
        response = await post(`/repositories/gitlab/${repositoryPath}`, {});
      }
      if (response.error) {
        toast({
          variant: 'destructive',
          title: `${t('error')}`,
          description: `${response.error}`,
        });
        return;
      }
      toast({
        variant: 'Success',
        title: `${t('done')}`,
        description: `${t('repositoryUploadedSuccessfully')}`,
      });
      localStorage.setItem('repositoryPath', repositoryPath);
    }
  };

  const handleRefresh = async () => {
    if (repositoryPath) {
      let response;
      toast({
        variant: 'default',
        title: `${t('uploading')}...`,
        description: `${t('repositoryUploading')}`,
        duration: Infinity,
      });
      if (repositoryPath.includes(':') || repositoryPath.includes('/')) {
        response = await put('/repositories/local/refresh', repositoryPath, {}, 'text/plain');
      } else {
        response = await put(`/repositories/gitlab/${repositoryPath}/refresh`, {});
      }
      toast({
        variant: 'default',
        title: `${t('done')}`,
        description: `${t('repositoryUploadedSuccessfully')}`,
      });
      if (response.error) {
        toast({
          variant: 'destructive',
          title: `${t('error')}`,
          description: `${response.error}`,
        });
        return;
      }
      toast({
        variant: 'Success',
        title: `${t('done')}`,
        description: `${t('repositoryUploadedSuccessfully')}`,
      });
      localStorage.setItem('repositoryPath', repositoryPath);
    }
  };
  return (
    <div className="grid gap-4 py-4">
      <Label htmlFor="repositoryPath" className="text-2xl">
        {t('repository')}
      </Label>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="col-start-1 col-span-3 text-sm text-muted-foreground">{t('repositoryDescription')}</div>

        <Input
          onChange={(e) => setRepositoryPath(e.target.value)}
          value={repositoryPath}
          placeholder="Path to your repository"
          className="col-span-4"
        />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{t('repositoryReUploadDescription')}</div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="col-span-4 flex justify-center space-x-12">
          <Button onClick={handleRefresh} variant="secondary">
            {t('repositoryReUpload')}
          </Button>
          <Button onClick={handleUpload}>{t('repositoryUpload')}</Button>
        </div>
      </div>
    </div>
  );
};

export default Repository;
