export type RecordWithOptionalKey<K extends keyof any, T> = {
  [P in K]?: T;
};
