import { Columns2, RefreshCcw, SquarePen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Sheet, SheetTrigger, SheetContent } from '../ui/Sheet';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { useNavigate } from 'react-router-dom';
import { setMessages } from '@/redux/MessagesSlice';
import { setActiveConversation } from '@/redux/ConversationSlice';
import { DialogTitle, DialogDescription } from '../ui/Dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { t } from 'i18next';
import NavbarContent from './NavbarContent';
import Setting from '../settings/Settings';

const MobileNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const persistence = useAppSelector((state) => state.persistence);

  const handleNewActiveConversation = () => {
    dispatch(setMessages([]));
    dispatch(setActiveConversation(null));
    navigate('/?chat=New');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className=" fixed top-3.5 left-5 z-10 shrink-0 lg:hidden ">
          <Columns2 className="h-4 w-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
        <DialogDescription className="sr-only">This is the navigation menu for the mobile view.</DialogDescription>
        <div className="flex max-h-screen min-h-screen w-full flex-col gap-2">
          <div className="flex justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Tooltip>
              <TooltipTrigger onClick={handleNewActiveConversation}>
                {persistence ? <SquarePen className="h-4 w-4" /> : <RefreshCcw className="h-4 w-4" />}
                <TooltipContent>
                  <span>{t('newChat')}</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </div>
          <NavbarContent />
          <Setting />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
