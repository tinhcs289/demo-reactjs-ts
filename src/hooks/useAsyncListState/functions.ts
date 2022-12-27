import type { TOnQueryRetuns } from './_types';
export function isValidResult<T>(data?: TOnQueryRetuns<T>): boolean {
  return (
    !!data &&
    Number.isInteger(data.totalCount) &&
    data.totalCount > 0 &&
    Array.isArray(data.result) &&
    data.result.length > 0
  );
}
