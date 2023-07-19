import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import useQueryUrgencyDegrees from '@/hooks/useReactQueries/useQueryUrgencyDegrees';
import { useMemo, type ComponentType } from 'react';
export default function withQueryUrgencyDegrees(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryUrgencyDegrees(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useQueryUrgencyDegrees();
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
        (urgencyDegree) =>
          ({
            ...urgencyDegree,
            label: `${urgencyDegree?.Name || ''}`.trim(),
            value: `${urgencyDegree?.Id || ''}`,
          }) as AutoCompleteOption
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
