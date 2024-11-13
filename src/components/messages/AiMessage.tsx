import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { AiMessagesInterface } from '@/interfaces/Messages-interface';
import MarkdownText from '@/util/markdown/Markdown';
import { LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AiMessage = ({ message }: { message: AiMessagesInterface }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="py-2 px-3 text-base md:px-4 m-auto lg:px-1 xl:px-5">
        <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="pt-0.5">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <div className="relative p-1 rounded-sm flex items-center justify-center  h-8 w-8">
                    <Avatar>
                      <AvatarFallback> {message.chatMessageType.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div className="min-h-[20px] flex flex-col items-start break-words overflow-x-auto gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <div className="w-full break-words">
                      {message.text === 'Advanced Coding Assistant is thinking...' ? (
                        <div className=" flex gap-2 items-center">
                          <span className="pb-1 text-text-primary">Advanced Coding Assistant is thinking</span>
                          <LoaderCircle className="animate-spin h-5 w-5"></LoaderCircle>
                        </div>
                      ) : (
                        <>
                          <MarkdownText markdown={message.text} />
                          <p hidden={!message.toolExecutionRequests}>
                            <strong>{t('requestingToolForHelp')} :</strong> {message.toolExecutionRequests}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMessage;
