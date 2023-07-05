import type { ArraySchema, AnyObject } from 'yup';
export default function isValidAsYupArraySchema<T>(
  value: T[] | null,
  schema: ArraySchema<T[] | undefined, AnyObject, '', ''>
) {
  if (!value) return false;
  if (!schema) return false;
  try {
    schema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}
