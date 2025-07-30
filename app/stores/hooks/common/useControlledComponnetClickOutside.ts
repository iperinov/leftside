import { useEffect } from "react";

export default function useControlledComponentClickOutside(
  outsideOfElelementRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  onOpenChanged: (o: boolean) => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (outsideOfElelementRef.current && !outsideOfElelementRef.current.contains(event.target as Node)) {
        onOpenChanged(false);
      }
    }
    open ? document.addEventListener("click", handleClickOutside) : document.removeEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, onOpenChanged, outsideOfElelementRef]);
}
