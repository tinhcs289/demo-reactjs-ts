import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { CommonFormProps, DateRange } from '@/types';
export type FormValues = {
  Keyword?: string | null;
  DateReceived?: DateRange | null;
  //DateProcess?: DateRange | null;
  //DatePublish?: DateRange | null;
  Status?: CheckGroupOption[] | null;
  DocumentBook?: RadioGroupOption | null;
  DocumentType?: RadioGroupOption | null;
  DocumentNotation?: string | null;
  NumberInIssueBook?: string | null;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
