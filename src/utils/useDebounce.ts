import { useEffect, useState } from "react";

/**
 * A hook that returns a debounced version of the given value.
 * @param value - the value to debounce
 * @param delay - the delay in milliseconds
 * @returns the debounced value
 */
export function useDebounce(value: any, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
