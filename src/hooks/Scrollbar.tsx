import { RefObject } from 'react';

export function isScrolledIntoView(elemRef: RefObject<HTMLDivElement>) {
  if (!elemRef.current) return false;

  const rect = elemRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top >= 0 && rect.bottom <= windowHeight;
}
