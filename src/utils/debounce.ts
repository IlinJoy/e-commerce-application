import type { RefObject } from 'react';

type DebouncedFunctionParam<A> = { [key: string]: A };

export function debounce<A>(
  function_: (arg: DebouncedFunctionParam<A>) => void,
  timeoutIdRef: RefObject<NodeJS.Timeout | undefined>,
  timeMs?: number
) {
  const defaultDelay = 200;

  return function (arg: DebouncedFunctionParam<A>) {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => function_(arg), timeMs || defaultDelay);
  };
}
