import React, { useEffect, useRef, useState } from 'react';
import { sendMessage } from '@/service/OpenAiService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { SendHorizontal } from 'lucide-react';
import { setActiveChatAtTop } from '@/redux/ConversationSlice';
import { useTranslation } from 'react-i18next';
import UploadFiles from '@/components/files/UploadFiles';

const UserInput = () => {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const activeConversation = useAppSelector((state) => state.conversation.activeConversation);
  const persistence = useAppSelector((state) => state.persistence);
  const navigate = useNavigate();
  const messages = useAppSelector((state) => state.messages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const handleSend = async () => {
    setMessage('');
    setIsLoading(true);
    const chatId = await sendMessage(message, dispatch, activeConversation, messages, persistence);
    if (chatId && chatId !== activeConversation && chatId.trim() !== '') {
      navigate(`/chat/${chatId}`);
    }
    if (chatId) dispatch(setActiveChatAtTop(chatId));
    setIsLoading(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement> | React.ClipboardEvent<HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLTextAreaElement;
    const key = (e as React.KeyboardEvent<HTMLInputElement>).key as string;
    target.style.height = 'inherit';
    target.style.height = `${target.scrollHeight}px`;
    if (key === 'Enter' && !(e as React.KeyboardEvent<HTMLInputElement>).shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-auto pb-5 ">
      <div className="w-full flex justify-center max-md:px-5 max-sm:px-2">
        <div className={`${persistence ? 'bg-muted' : 'bg-foreground'} flex items-end justify-between w-full max-w-3xl rounded-3xl p-3`}>
          <div className={`${!persistence ? 'text-secondary' : 'text-text-primary'} flex justify-center`}>
            <UploadFiles />
          </div>
          <textarea
            rows={1}
            ref={textareaRef}
            id={activeConversation || 'input'}
            name="message"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(e)}
            onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => handleKeyDown(e)}
            spellCheck="false"
            placeholder={t('typeMessage')}
            className={`${persistence ? 'bg-muted' : 'bg-foreground text-secondary'} w-[calc(90%)] text-text-primary resize-none max-h-48 border-none outline-none`}
          />
          <button
            onClick={handleSend}
            title="Send"
            className={`w-6 h-6 ${message.trim().length > 0 && !isLoading ? 'cursor-pointer' : 'cursor-not-allowed text-gray-500'} ${!persistence ? 'text-secondary' : 'text-text-primary'}`}
            disabled={message.trim().length === 0 || isLoading}
          >
            <SendHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
