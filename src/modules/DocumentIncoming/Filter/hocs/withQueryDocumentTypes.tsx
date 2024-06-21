import type { RadioGroupOption, RHFRadioGroupProps } from '@/components/rhfInputs/RHFRadioGroup';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { default as useReactQuery } from '@/hooks/useReactQueries/useQueryDocumentType';
import { useMemo, type ComponentType } from 'react';
export default function withQueryDocumentTypes(
  WrappedComponent: ComponentType<RHFRadioGroupProps>
): ComponentType<RHFRadioGroupProps> {
  return function FieldWithQueryDocumentTypes(props: RHFRadioGroupProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useReactQuery();
    const loading = useMemo(
      () => !!isLoading || !!isFetching || !!loadingProp,
      [isLoading, isFetching, loadingProp]
    );
    const options = useMemo(
      () =>
        arrayOrEmpty(data).map(
          (docType) =>
            ({
              ...docType,
              label: `${docType?.Name || ''}`.trim(),
              value: `${docType?.Id || ''}`,
            }) as RadioGroupOption
        ),
      [data]
    );
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
