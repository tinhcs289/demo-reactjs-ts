import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { default as useReactQuery } from '@/hooks/useReactQueries/useQueryPoliceUnitInternal';
import { useMemo, type ComponentType } from 'react';
export default function withQueryUnitExternal(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryUnitExternal(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useReactQuery();
    const loading = useMemo(
      () => !!isLoading || !!isFetching || !!loadingProp,
      [isLoading, isFetching, loadingProp]
    );
    const options = useMemo(() => {
      return arrayOrEmpty(data).map(
        (unit) =>
          ({
            ...unit,
            label: `${unit?.TenDonVi || ''}`.trim(),
            value: `${unit?.Id || ''}`,
          }) as AutoCompleteOption
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
