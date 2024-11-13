import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllMessages, removeMessagesFromStore } from '@/redux/MessagesSlice';
import { useAppSelector, useAppDispatch } from '@/redux/Store';
import { fetchFiles } from '@/redux/FilesSlice';
import { isAiMessageRequestType, isAiMessageType, isToolExecutionResult } from '@/interfaces/Messages-interface';
import AiMessage from './AiMessage';
import ToolExecutionResult from './ToolExecutionResult';
import UserMessage from './UserMessage';
import { toast } from '@/lib/use-toast';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { setActiveConversation } from '@/redux/ConversationSlice';

const Messages = () => {
  const messages = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();
  const debug = useAppSelector((state) => state.debugMode);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchAllMessages(id)).then((response) => {
        if ('error' in response.payload) {
          toast({
            variant: 'destructive',
            title: `Error`,
            description: (
              <ErrorMessage
                message={
                  <div>
                    Unable to load conversation :<strong>{id}</strong>.
                  </div>
                }
              />
            ),
          });
          dispatch(removeMessagesFromStore());
          dispatch(setActiveConversation(null));
          navigate('/');
        }
        dispatch(fetchFiles(id));
      });
    }
  }, [id, dispatch, navigate]);

  return (
    <>
      {messages.length > 0 ? (
        <section className="flex flex-col pb-5">
          {messages.map((msg, index) => {
            switch (msg.chatMessageType) {
              case 'USER':
                return <UserMessage message={msg} key={index} />;
              case 'AI':
                if (isAiMessageType(msg)) {
                  if (debug) {
                    return <AiMessage message={msg} key={index} />;
                  } else if (!isAiMessageRequestType(msg)) {
                    return <AiMessage message={msg} key={index} />;
                  }
                } else {
                  return null;
                }
                break;
              case 'TOOL_EXECUTION_RESULT':
                if (isToolExecutionResult(msg) && debug) {
                  return <ToolExecutionResult message={msg} key={index} />;
                } else {
                  return null;
                }
              default:
                return null;
            }
          })}
        </section>
      ) : /*  <DefaultPage /> */
      null}
    </>
  );
};

export default memo(Messages);
