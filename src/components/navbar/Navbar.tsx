import { Columns2, RefreshCcw, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { fetchAllConversations, setActiveConversation } from '@/redux/ConversationSlice';
import MobileNavbar from './MobileNavbar';
import { setMessages } from '@/redux/MessagesSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import React from 'react';

const NavbarContent = React.lazy(() => import('./NavbarContent'));
const Setting = React.lazy(() => import('../settings/Settings'));

const Navbar = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const persistence = useAppSelector((state) => state.persistence);

  useEffect(() => {
    dispatch(fetchAllConversations());
    console.log('Navbar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewActiveConversation = () => {
    dispatch(setMessages([]));
    dispatch(setActiveConversation(null));
    if (persistence) {
      navigate('/?chat=New');
      return;
    }
    navigate('/?temporary-chat=true');
  };

  return (
    <aside>
      <div className={`${isSidebarOpen ? 'hidden' : 'fixed top-2.5 left-6 gap-3 lg:flex'} z-10 hidden`}>
        <Tooltip>
          <TooltipTrigger title={t('toggleSidebar')} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="h-8 w-8">
            <Columns2 className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <span>{t('toggleSidebar')}</span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger title={t('newChat')} onClick={handleNewActiveConversation} className="h-8 w-8">
            {persistence ? <SquarePen className="h-4 w-4" /> : <RefreshCcw className="h-4 w-4" />}
          </TooltipTrigger>
          <TooltipContent>
            <span>{t('newChat')}</span>
          </TooltipContent>
        </Tooltip>
      </div>
      <aside
        className={`hidden transition-[width] overflow-x-hidden flex-shrink-0 border-r bg-muted/40 lg:block ${isSidebarOpen ? 'w-[20rem] visible' : 'w-0 invisible'}`}
      >
        <div className="flex max-h-screen min-h-screen  flex-col gap-2 w-[20rem]">
          <div className="flex justify-between h-12 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Tooltip>
              <TooltipTrigger title={t('toggleSidebar')} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="h-8 w-8">
                <Columns2 className="h-4 w-4" />
                <TooltipContent>
                  <span>{t('toggleSidebar')}</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger title={t('newChat')} onClick={handleNewActiveConversation}>
                {persistence ? <SquarePen className="h-4 w-4" /> : <RefreshCcw className="h-4 w-4" />}
                <TooltipContent>
                  <span>{t('newChat')}</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </div>
          <React.Suspense>
            <NavbarContent />
            <Setting />
          </React.Suspense>
        </div>
      </aside>
      <MobileNavbar />
    </aside>
  );
};
export default Navbar;
