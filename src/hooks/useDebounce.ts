import { useCallback, useEffect, useRef, useState } from "react";

const DEBOUNCE_TIME = 500;
// Taken from https://usehooks.com/useDebounce
// T is a generic type for value parameter, our case this will be string
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_TIME): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function useDebounceCallBackFunction<
  T extends ((...args: any[]) => any) | undefined
>(
  callback: T,
  delay: number = DEBOUNCE_TIME
): T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => void
  : undefined {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T extends (...args: any[]) => any ? Parameters<T> : never) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (callback) {
        timeoutRef.current = setTimeout(() => {
          Function.prototype.apply.call(callback, null, args);
        }, delay);
      }
    },
    [callback, delay]
  ) as T extends (...args: any[]) => any
    ? (...args: Parameters<T>) => void
    : undefined;

  return debouncedCallback;
}
