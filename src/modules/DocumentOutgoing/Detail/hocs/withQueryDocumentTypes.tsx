import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import useQueryDocumentType from '@/hooks/useReactQueries/useQueryDocumentType';
import { useMemo, type ComponentType } from 'react';
export default function withQueryDocumentTypes(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryDocumentTypes(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useQueryDocumentType();
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
            }) as AutoCompleteOption
        ),
      [data]
    );
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
