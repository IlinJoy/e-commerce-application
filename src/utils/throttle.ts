type FunctionUnknown = (...args: unknown[]) => unknown;

export function throttle<T extends FunctionUnknown>(func: T, delay: number) {
  let timer = false;

  return function (...args: Parameters<T>): void {
    if (!timer) {
      func(...args);
      timer = true;
      setTimeout(() => (timer = false), delay);
    }
  };
}
