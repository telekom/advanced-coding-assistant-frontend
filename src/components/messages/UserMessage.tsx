import { MessageInterface } from '@/interfaces/Messages-interface';

const UserMessage = ({ message }: { message: MessageInterface }) => {
  return (
    <div>
      <div className="py-7 px-3 text-base md:px-4 m-auto lg:px-1 xl:px-5">
        <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div className="min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words overflow-x-auto gap-2">
                  <div className="flex w-full flex-col gap-1 items-end ">
                    <div className="relative max-w-[70%] rounded-3xl bg-muted text-text-primary px-5 py-2.5">{message.text}</div>
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

export default UserMessage;
