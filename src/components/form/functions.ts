import type { FieldValues } from "react-hook-form";
import type { FormField, FormInputType } from "./field-types";
export function field<T extends FieldValues, U extends FormInputType>(
  args: FormField<T, U>
): FormField<T, U> {
  return { ...args };
}