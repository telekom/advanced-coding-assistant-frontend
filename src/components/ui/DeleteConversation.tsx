import { Trash } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { deleteConversationById, setActiveConversation } from '@/redux/ConversationSlice';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import { ConversationInterface } from '@/interfaces/Conversation-interface';
import { removeMessagesFromStore } from '@/redux/MessagesSlice';
import { Trans, useTranslation } from 'react-i18next';

const DeleteConversation = ({ conversation }: { conversation: ConversationInterface }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeConversation = useAppSelector((state) => state.conversation.activeConversation);
  const { t } = useTranslation();

  const handleDelete = () => {
    dispatch(deleteConversationById(conversation.id));
    if (conversation.id === activeConversation) {
      dispatch(removeMessagesFromStore());
      dispatch(setActiveConversation(null));
      navigate('/');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 rounded-md px-3 text-xs">
        <div className="flex justify-start gap-3 items-center">
          <Trash className="h-4 w-4" />
          {t('delete')}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            <Trans i18nKey="deleteDescription" values={{ name: conversation.title }}></Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md "
          >
            {t('delete')}
          </AlertDialogAction>
          <AlertDialogCancel className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md ">
            {t('cancel')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConversation;
