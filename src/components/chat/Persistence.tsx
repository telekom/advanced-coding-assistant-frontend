import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { InfoIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { togglePersistence } from '@/redux/PersistenceSlice';
import { useNavigate } from 'react-router-dom';
import { setActiveConversation } from '@/redux/ConversationSlice';
import { setMessages } from '@/redux/MessagesSlice';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const Persistence = () => {
  const dispatch = useAppDispatch();
  const persistence = useAppSelector((state) => state.persistence);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePersistence = useCallback(
    (value: boolean) => {
      dispatch(togglePersistence(value));
      dispatch(setActiveConversation(null));
      dispatch(setMessages([]));
      if (value) {
        navigate('/?chat=New');
        return;
      }
      navigate('/?temporary-chat=true');
    },
    [dispatch, navigate],
  );

  return (
    <div className="flex justify-end space-x-2 p-4 mr-2">
      <Select value={persistence ? 'true' : 'false'} onValueChange={(value) => handlePersistence(value === 'true')}>
        <SelectTrigger className="w-[180px] h-8 text-sm">
          <SelectValue placeholder={persistence ? 'Persistence' : 'Temporary'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">{t('persistence')}</SelectItem>
          <SelectItem value="false">{t('temporary')}</SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger>
          <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">
          {persistence ? 'Your chat history will be saved.' : 'Your chat history will not be saved.'}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Persistence;
