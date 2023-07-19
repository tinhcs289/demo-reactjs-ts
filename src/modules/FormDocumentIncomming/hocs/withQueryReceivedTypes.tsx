import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import useQueryDocumentReceivedType from '@/hooks/useReactQueries/useQueryDocumentReceivedType';
import { useMemo, type ComponentType } from 'react';
export default function withQueryDocumentTypes(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryDocumentTypes(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useQueryDocumentReceivedType();
    const loading = useMemo(() => {
      if (isLoading) return true;
      if (isFetching) return true;
      if (loadingProp) return true;
      return false;
    }, [isLoading, isFetching, loadingProp]);
    const options = useMemo(() => {
      if (!data) return [];
      if (!(data instanceof Array && data.length > 0)) return [];
      return data.map(
        (receivedType) =>
          ({
            ...receivedType,
            label: `${receivedType?.Name || ''}`.trim(),
            value: `${receivedType?.Id || ''}`,
          }) as AutoCompleteOption
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
