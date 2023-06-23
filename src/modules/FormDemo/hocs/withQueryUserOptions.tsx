import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import useQueryFakeUsers from '@/hooks/useReactQueries/useQueryFakeUsers';
import { useMemo, type ComponentType } from 'react';
export default function withQueryUserOptions(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryUserOptions(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useQueryFakeUsers();
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
        (user) =>
          ({
            ...user,
            label: `${user?.name?.firstname || ''} ${user?.name?.lastname || ''}`.trim(),
            value: `${user.id}`,
          } as AutoCompleteOption)
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
