import { useLayoutEffect, useState } from "react";
import type Position from "~/common/Position";

export default function usePositionToElement(elementRef: React.RefObject<HTMLDivElement | null>, deps?: React.DependencyList) {
   const [position, setPosition] = useState<Position>();

    useLayoutEffect(() => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    }, deps);

    return position
}
