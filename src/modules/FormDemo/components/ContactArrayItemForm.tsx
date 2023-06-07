import { FielArrayItemProps, FormGridFieldsWithNamePrefix } from '@/components/form';
import { GridContainerPaper } from '@/components/grid';
export default function ContactArrayItemForm(props: FielArrayItemProps) {
  const { itemName, item, subFields } = props;
  return (
    <GridContainerPaper key={item.id} sx={{ width: '100%', p: 2, mb: 1 }} elevation={10}>
      <FormGridFieldsWithNamePrefix namePrefix={itemName} fields={subFields} />
    </GridContainerPaper>
  );
}
