import { ConversationInterface } from '@/interfaces/Conversation-interface';
import { useAppSelector } from '@/redux/Store';
import { t } from 'i18next';
import { MessageSquare, Files } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import Conversation from '../ui/Conversation';
import { ScrollArea } from '../ui/ScrollArea';
import ShowFiles from '../files/ShowFiles';

const NavbarContent = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const conversations: ConversationInterface[] = useAppSelector((state) => state.conversation.conversations);
  const files = useAppSelector((state) => state.files);
  const persistence = useAppSelector((state) => state.persistence);

  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  return (
    <>
      {!persistence ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl font-bold text-muted-foreground">{t('temporary')}</div>
            <div className="text-lg text-muted-foreground">{t('temporaryDescription')}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-auto flex-1">
          <nav className="grid gap-2 items-start text-sm font-medium ">
            <div className="grid gap-2 items-start text-sm font-medium px-2 lg:px-4">
              <div
                onClick={() => handleSetActiveTab('conversations')}
                className={`${activeTab === 'conversations' ? 'bg-muted' : ''} flex text-xl cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted`}
              >
                <MessageSquare className="h-6 w-6" />
                {t('conversation')}
              </div>
              <div
                onClick={() => handleSetActiveTab('files')}
                className={`${activeTab === 'files' ? 'bg-muted' : ''} flex text-xl  cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted`}
              >
                <Files className="h-6 w-6" />
                {t('files')}
              </div>
              <hr />
            </div>
          </nav>
          {activeTab === 'conversations' ? (
            <ScrollArea className="overflow-auto overflow-x-hidden mt-2">
              <ol>
                {Array.isArray(conversations)
                  ? conversations.map((conversation) => <Conversation key={conversation.id} conversation={conversation} />)
                  : null}
              </ol>
            </ScrollArea>
          ) : (
            <ScrollArea className="overflow-auto overflow-x-hidden mt-2">
              <ol>
                {files.map((file) => (
                  <ShowFiles key={file.id} file={file} />
                ))}
              </ol>
            </ScrollArea>
          )}
        </div>
      )}
    </>
  );
};

export default memo(NavbarContent);
