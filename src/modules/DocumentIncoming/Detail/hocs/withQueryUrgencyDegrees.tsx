import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { default as useReactQuery } from '@/hooks/useReactQueries/useQueryUrgencyDegrees';
import { useMemo, type ComponentType } from 'react';
export default function withQueryUrgencyDegrees(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryUrgencyDegrees(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useReactQuery();
    const loading = useMemo(
      () => !!isLoading || !!isFetching || !!loadingProp,
      [isLoading, isFetching, loadingProp]
    );
    const options = useMemo(
      () =>
        arrayOrEmpty(data).map(
          (urgencyDegree) =>
            ({
              ...urgencyDegree,
              label: `${urgencyDegree?.Name || ''}`.trim(),
              value: `${urgencyDegree?.Id || ''}`,
            }) as AutoCompleteOption
        ),
      [data]
    );
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
