import type { RefObject } from 'react';

type DebouncedFunctionParam = { [key: string]: string[] };
type DebouncedFunction = (arg: DebouncedFunctionParam) => void;

export function debounce<T extends DebouncedFunction>(
  function_: T,
  timeoutIdRef: RefObject<NodeJS.Timeout | undefined>,
  timeMs?: number
) {
  const defaultDelay = 200;

  return function (arg: DebouncedFunctionParam) {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => function_(arg), timeMs || defaultDelay);
  };
}
