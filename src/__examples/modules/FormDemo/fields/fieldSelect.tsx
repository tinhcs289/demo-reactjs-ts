import { field, formItemSx } from '@/components/form';
import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import useQueryFakeUsers from '@/hooks/useReactQueries/useQueryFakeUsers';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import { useMemo, type ComponentType } from 'react';
function withQueryUserOptions(
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
          }) as AutoCompleteOption
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
export const fieldSelect = field({
  name: 'SelectField',
  inputType: 'select',
  label: 'Input dạng lựa chọn giá trị bằng menu xổ xuống (Dropdown Select)',
  componentProps: {
    placeholder: 'Lựa chọn giá trị',
  },
  hocs: [withQueryUserOptions],
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'SelectField',
      codeExample: `import { field, formItemSx } from '@/components/form';
import withQueryUserOptions from '@/some-where-in-your-project';
import useQuery from 'react-query';
import getFromApi from '@/some-async-function-to-get-data-from-api';
function withQueryUserOptions(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryUserOptions(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } =  useQuery<UserFake[]>({
      queryKey: ['fakeUser/all'],
      queryFn: getFromApi,
      staleTime: Infinity,
      cacheTime: Infinity,
    });
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
            label: \`\${user?.name?.firstname || ''} \${user?.name?.lastname || ''}\`.trim(),
            value: \`\${user.id}\`,
          }) as AutoCompleteOption
      );
    }, [data]);
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}

field({
  name: 'SelectField',
  inputType: 'select',
  label: 'Input dạng lựa chọn giá trị bằng menu xổ xuống (Dropdown Select)',
  componentProps: {
    placeholder: 'Lựa chọn giá trị',
  },
  hocs: [withQueryUserOptions],
  sx: formItemSx,
})`,
    }),
  ],
});
