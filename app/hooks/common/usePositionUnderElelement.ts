import { useLayoutEffect } from "react";

interface UsePositionUnderElementProps {
  ref: React.RefObject<HTMLDivElement | null>;
  setPosition: (position: { top: number; left: number }) => void;
  open?: boolean;
}

export default function usePositionUnderElement({ ref, setPosition }: UsePositionUnderElementProps) {
  console.log("layout effect ", ref.current);
  useLayoutEffect(() => {
    console.log("layout effect called for ref ", ref.current?.getBoundingClientRect());
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  });
}
