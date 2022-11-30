export type TLsSyncKey = {
  value: string;
  name: string;
  previousValue?: string;
};

export type TLsChangeEvent = CustomEvent<TLsSyncKey>;

export type TLsItem<T> = {
  key: string;
  get: () => T | null;
  set: (value: T) => void;
};
