import { CircleArrowDown } from 'lucide-react';
import { RefObject, useCallback, useEffect } from 'react';

export function isScrolledIntoView(elemRef: RefObject<HTMLDivElement>) {
  if (!elemRef.current) return false;

  const rect = elemRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top >= 0 && rect.bottom <= windowHeight;
}

export function ScrollToBottom({ bottomDivElementRef }: { bottomDivElementRef: RefObject<HTMLDivElement> }) {
  const handleScrollDown = useCallback(() => {
    if (bottomDivElementRef.current) {
      bottomDivElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bottomDivElementRef]);

  useEffect(() => {
    handleScrollDown();
  }, [handleScrollDown]);

  return (
    <CircleArrowDown
      onClick={handleScrollDown}
      className="absolute bottom-24 h-8 w-8 right-[50%] rounded-full cursor-pointer transition-opacity duration-300 z-10"
    />
  );
}
