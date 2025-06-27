import { useLayoutEffect, useState } from "react";

export default function useRectOfElement(elementRef: React.RefObject<HTMLDivElement | null>, deps?: React.DependencyList) {
   const [rect, setRect] = useState<DOMRect>();

    useLayoutEffect(() => {
      setRect(elementRef.current?.getBoundingClientRect());
    }, deps);

    return rect
}
