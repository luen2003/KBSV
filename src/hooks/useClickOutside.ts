import { useEffect, type RefObject } from "react";

export default function useClickOutside({
  ref,
  onOutsideClick
}: {
  ref: RefObject<HTMLElement>;
  onOutsideClick: () => void;
}) {
  useEffect(() => {
    // Function to call on outside click
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]); // Re-run if ref or handler changes
}
