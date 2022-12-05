export type TCookieItem<T> = {
  key: string;
  get: () => T | null | undefined;
  set: (value: T | null | undefined) => void;
  clear: () => void;
};
