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

export type TLsChangeHandler<DetailType> = (
  event: TLsChangeEvent,
  detail: TLsChangeEventValue<DetailType>
) => void;

export type TLsSyncItem<DetailType> = {
  key: string;
  get: () => DetailType | null | undefined;
  /**
   * @example 
      auth.set(jwt)
      // used for normal cases the change event will affect all tabs which subscribe to changes of `auth`
   * @example 
      auth.set(jwt, true) 
      // the listener for `auth` in the current tab will be stopped till the next change happen.
      // used in case the change event will affect other tabs not the current
   */
  set: (value: DetailType | null | undefined, stopListenerInThisTab?: boolean) => void;
  onChange: (handler: TLsChangeHandler<DetailType>) => void;
};
