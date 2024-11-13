import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog';
import Language from './Language';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { useTranslation } from 'react-i18next';
import Repository from './Repository';
import DebugToggle from './DebugToggle';
import Theme from './Theme';
import FontSize from './FontSize';
import CleanupDatabase from './CleanupDatabase';

const Settings = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-3 mx-2 lg:mx-3"> {t('settings')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0">
        <Tabs defaultValue="general" className="w-full h-[600px]">
          <div className="flex h-full">
            <TabsList className="flex flex-col h-full justify-start items-stretch space-y-2 bg-muted p-4 rounded-l-lg">
              <TabsTrigger value="general" className="justify-start">
                {t('general')}
              </TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start">
                {t('appearance')}
              </TabsTrigger>
              <TabsTrigger value="repo" className="justify-start">
                {t('repository')}
              </TabsTrigger>

            </TabsList>
            <div className="flex-1 p-6">
              <DialogHeader>
                <DialogTitle>{t('settings')}</DialogTitle>
                <DialogDescription>{t('settingsDescription')}</DialogDescription>
              </DialogHeader>
              <TabsContent value="general">
                <Language />
                <DebugToggle />
                <CleanupDatabase/>
              </TabsContent>
              <TabsContent value="appearance">
                <Theme />
                <FontSize />
              </TabsContent>
              <TabsContent value="repo">
                <Repository />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
