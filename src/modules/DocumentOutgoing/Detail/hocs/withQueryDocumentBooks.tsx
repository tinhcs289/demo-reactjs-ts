import type { AutoCompleteOption, RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import useQueryIncommingDocumentBooks from '@/hooks/useReactQueries/useQueryIncommingDocumentBooks';
import { useMemo, type ComponentType } from 'react';
export default function withQueryDocumentBooks(
  WrappedComponent: ComponentType<RHFSelectProps>
): ComponentType<RHFSelectProps> {
  return function FieldWithQueryDocumentBooks(props: RHFSelectProps) {
    const { loading: loadingProp, options: _, ...otherProps } = props;
    const { data, isLoading, isFetching } = useQueryIncommingDocumentBooks();
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
            }) as AutoCompleteOption
        ),
      [data]
    );
    return <WrappedComponent {...otherProps} loading={loading} options={options} />;
  };
}
