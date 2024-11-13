import { useParams } from 'react-router-dom';
import { setActiveConversation } from '@/redux/ConversationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { useRef, useState, useEffect, memo } from 'react';
import { ChatProps } from '@/interfaces/ChatProps';
import { isScrolledIntoView, ScrollToBottom } from '@/hooks/Scrollbar';

const Chat: React.FC<ChatProps> = memo(({ navbar, outlet, userInput, toaster, persistenceOption }) => {
  const bottomDivElementRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(true);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const messagesData = useAppSelector((state) => state.messages);

  useEffect(() => {
    if (!id) return;
    dispatch(setActiveConversation(id));
  }, [dispatch, id]);

  const handleScroll = () => {
    if (bottomDivElementRef.current) {
      const isVisible = isScrolledIntoView(bottomDivElementRef);
      setIsBottom(isVisible);
      console.log(isVisible);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [messagesData]);

  return (
    <div className="flex w-full h-screen">
      {navbar}
      <div className="relative flex flex-col justify-center w-full">
        <main className=" flex flex-col flex-1 overflow-y-auto pb-8 " onScroll={handleScroll}>
          <div className="absolute w-full z-10 bg-background">{persistenceOption}</div>
          <div className="pt-12">{outlet}</div>
          <div className="h-1" ref={bottomDivElementRef} />
        </main>
        {!isBottom && <ScrollToBottom bottomDivElementRef={bottomDivElementRef} />}
        {userInput}
      </div>
      {toaster}
    </div>
  );
});

export default Chat;
