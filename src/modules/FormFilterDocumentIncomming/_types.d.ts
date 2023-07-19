import type { CommonFormProps } from '@/types';
import type { Moment } from 'moment';
import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
export type FormValues = {
  Keyword?: string | null;
  DateReceived?: {
    From?: Moment | null;
    To?: Moment | null;
  } | null;
  DateProcess?: {
    From?: Moment | null;
    To?: Moment | null;
  } | null;
  Status?: CheckGroupOption<>[] | null;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
