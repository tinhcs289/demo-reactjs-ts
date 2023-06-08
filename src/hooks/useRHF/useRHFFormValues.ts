import { useFormContext, useWatch } from "react-hook-form";
// - The initial return value from useWatch will always return what's inside of defaultValue or defaultValues from useForm.
// - The only difference between useWatch and watch is at the root (useForm) level or the custom hook level update.
// - useWatch's execution order matters, which means if you update a form value before the subscription is in place, then the value updated will be ignored.
// ------------------------------------
// wrong usage ------------------------
// setValue('test', 'data');
// useWatch({ name: 'test' }); // ❌ subscription is happened after value update, no update received
// ------------------------------------
// right usage ------------------------
// useWatch({ name: 'example' }); // ✅ input value update will be received and trigger re-render
// setValue('example', 'data'); 
// ------------------------------------
// You can overcome the above issue with a simple custom hook as below:
export default function useRHFFormValues<FormValues>() {
  const { getValues } = useFormContext();
  return {
    ...useWatch(), // subscribe to form value updates
    ...getValues(), // always merge with latest form values
  } as FormValues
}