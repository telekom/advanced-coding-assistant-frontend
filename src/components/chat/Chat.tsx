import { useParams } from 'react-router-dom';
import { setActiveConversation } from '@/redux/ConversationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { useRef, useState, useEffect, memo } from 'react';
import { ChatProps } from '@/interfaces/ChatProps';
import { isScrolledIntoView } from '@/hooks/Scrollbar';
import { CircleArrowDown } from 'lucide-react';

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
    }
  };
  const handleScrollDown = () => {
    if (bottomDivElementRef.current) {
      bottomDivElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleScrollDown();
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
        {!isBottom && (
          <CircleArrowDown
            onClick={handleScrollDown}
            className="absolute bottom-24 h-8 w-8 right-[50%] rounded-full cursor-pointer transition-opacity duration-300 z-10"
          />
        )}

        {userInput}
      </div>
      {toaster}
    </div>
  );
});

export default Chat;
