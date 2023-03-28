import type { ObjectSchema } from 'yup';
export default function isValidAsYupSchema<T extends Object>(value: T | null, schema: ObjectSchema<T>) {
  if (!value) return false;
  if (!schema) return false;
  try {
    schema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}