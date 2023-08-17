import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { CommonFormProps, DateRange } from '@/types';
export type FormValues = {
  Keyword?: string | null;
  DateReceived?: DateRange | null;
  DateProcess?: DateRange | null;
  DatePublish?: DateRange | null;
  Status?: CheckGroupOption<>[] | null;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
