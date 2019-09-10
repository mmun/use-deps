type EqualityFn = (value1: any, value2: any) => boolean;

export default function useDeps<T extends unknown[]>(
  deps: T,
  equalityFn: EqualityFn = Object.is
): T;
