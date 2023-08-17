import type { FieldArrayComponentProps } from '@/components/form';
import { useRHFArrayContext } from '@/components/form';
import List from '@mui/material/List';
export default function OtherFileList(props: FieldArrayComponentProps) {
  const { name, fields: fieldsSub, itemComponent: ItemComponent } = props;
  const { fields: fieldArray } = useRHFArrayContext();
  if (!ItemComponent) return null;
  return (
    <List dense sx={{ width: '100%' }}>
      {fieldArray.map((item: Record<'id', string>, index) => (
        <ItemComponent
          key={item.id}
          rootName={name}
          item={item}
          itemIndex={index}
          itemName={`${name}.${index}`}
          subFields={fieldsSub}
        />
      ))}
    </List>
  );
}
