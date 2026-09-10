import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value
 *
 * @param {T} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {T} The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
