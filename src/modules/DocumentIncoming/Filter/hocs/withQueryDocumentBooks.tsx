import type { RadioGroupOption, RHFRadioGroupProps } from '@/components/rhfInputs/RHFRadioGroup';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { default as useReactQuery } from '@/hooks/useReactQueries/useQueryIncommingDocumentBooks';
import { useMemo, type ComponentType } from 'react';
export default function withQueryDocumentBooks(
  WrappedComponent: ComponentType<RHFRadioGroupProps>
): ComponentType<RHFRadioGroupProps> {
  return function FieldWithQueryDocumentBooks(props: RHFRadioGroupProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useReactQuery();
    const loading = useMemo(
      () => !!isLoading || !!isFetching || !!loadingProp,
      [isLoading, isFetching, loadingProp]
    );
    const options = useMemo(
      () =>
        arrayOrEmpty(data).map(
          (book) =>
            ({
              ...book,
              label: `${book?.Name || ''}`.trim(),
              value: `${book?.Id || ''}`,
            }) as RadioGroupOption
        ),
      [data]
    );
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
