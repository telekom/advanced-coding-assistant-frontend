import { MoreHorizontal, PencilRuler } from 'lucide-react';
import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';
import DeleteConversation from './DeleteConversation';
import { useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { ConversationInterface } from '@/interfaces/Conversation-interface';
import { setActiveConversation } from '@/redux/ConversationSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Conversation = ({ conversation }: { conversation: ConversationInterface }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(conversation.title);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeConversation = useAppSelector((state) => state.conversation.activeConversation);
  const divRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleRenameSave = () => {
    if (!newTitle) {
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      handleRenameSave();
    }
  };

  const handleActiveConversation = () => {
    dispatch(setActiveConversation(conversation.id));
    navigate(`/chat/${conversation.id}`);
  };
  return (
    <li
      onClick={handleActiveConversation}
      ref={divRef}
      className={`${activeConversation === conversation.id ? 'bg-muted' : ''} flex group justify-between group text-xl cursor-pointer items-center mx-3 rounded-lg pl-3 pb-0. py-1 text-muted-foreground transition-all hover:bg-muted`}
    >
      {!isEditing ? (
        <p className="text-sm font-medium leading-none">{conversation.title.slice(0, 30)}</p>
      ) : (
        <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={handleKeyDown} />
      )}
      {!isEditing && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${activeConversation === conversation.id ? 'visible' : 'invisible group-hover:visible'}`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-2">
              <DropdownMenuItem onClick={handleEditClick} className="flex justify-start gap-3 items-center">
                <PencilRuler className="h-4 w-4" />
                {t('edit')}
              </DropdownMenuItem>
              <DeleteConversation conversation={conversation} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </li>
  );
};

export default Conversation;
