import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document | HTMLElement = window,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element?.addEventListener) return;

    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    element.addEventListener(eventType, eventListener, options);
    return () => {
      element.removeEventListener(eventType, eventListener, options);
    };
  }, [eventType, element, options]);
}
