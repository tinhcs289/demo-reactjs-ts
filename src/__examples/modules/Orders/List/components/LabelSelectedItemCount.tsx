import { useAsyncListGetter } from '../context';
export default function LabelSelectedItemCount() {
  const selectedItems = useAsyncListGetter((s) => s.selectedItems);
  const selectedItemIds = useAsyncListGetter((s) => s.selectedItemIds);
  return (
    <div>
      <span>items: {selectedItems?.length || 0}</span>
      &nbsp;--&nbsp;
      <span>ids: {selectedItemIds?.length || 0}</span>
    </div>
  );
}
