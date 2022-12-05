export type TLsSyncKey = {
  value: string;
  name: string;
  previousValue?: string;
};

export type TLsChangeEvent = CustomEvent<TLsSyncKey>;

export type TLsChangeEventValue<T> = {
  name: string;
  value: T | null | undefined;
  previousValue: T | null | undefined;
};

export type TLsItem<T> = {
  key: string;
  get: () => T | null | undefined;
  set: (value: T | null | undefined) => void;
  clear: () => void;
};

export type TLsSyncItem<T> = Omit<TLsItem<T>, 'clear'> & {
  onChange: (handler: (event: TLsChangeEvent, detail: TLsChangeEventValue<T>) => void) => void;
};
