import { useLayoutEffect, useState } from "react";

export default function useRectOfElement(elementRef: React.RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    setRect(elementRef.current?.getBoundingClientRect());
  }, [elementRef.current]);

  return rect;
}
