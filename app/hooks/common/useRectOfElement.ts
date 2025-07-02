import { useEffect, useLayoutEffect, useState } from "react";

/*export default function useRectOfElement(
  elementRef: React.RefObject<HTMLDivElement | null>,
) {
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    setRect(elementRef.current?.getBoundingClientRect());
  }, [elementRef.current]);

  return rect;
}*/

export default function useRectOfElement(
  ref: React.RefObject<HTMLElement | null>,
) {
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [ref.current]); // 👈 still won’t work fully if you rely on ref assignment after mount

  return rect;
}

export function useRectWithObserver(ref: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState<DOMRect | undefined>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateRect = () => {
      setRect(el.getBoundingClientRect());
    };

    const observer = new ResizeObserver(() => updateRect());

    observer.observe(el);
    updateRect(); // initial call

    return () => observer.disconnect();
  }, [ref.current]);

  return rect;
}
