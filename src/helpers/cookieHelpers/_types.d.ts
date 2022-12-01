export type TCookieItem<T> = {
  key: string;
  get: () => T | null;
  set: (value: T | null) => void;
};
