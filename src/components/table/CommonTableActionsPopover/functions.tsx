import newGuid from '@/helpers/stringHelpers/newGuid';
import type { AnyObject } from '@/types';
import type { ItemMenuActionComponent, ItemMenuActionConfig, ItemMenuActionRenderFunction } from './_types';
//#region ActionMenu
/**
 * Override the `ListItem` Component
 * @param Item the custom ListItem Component
 * @returns
 */
export function createMenuActionItem<RowData extends AnyObject>(
  Item: ItemMenuActionComponent<RowData, AnyObject>
): ItemMenuActionRenderFunction<RowData, AnyObject> {
  return function CustomActionItem(args) {
    const { key, ...otherArgs } = args;
    return <Item key={key} {...otherArgs} />;
  };
}
/**
 * create an array of configurations for popover menu for each row
 * @param actions
 * @returns
 */
export function menuActions<RowData extends AnyObject>(
  actions: Array<
    Omit<ItemMenuActionConfig<RowData>, 'key' | 'type'> & Partial<Pick<ItemMenuActionConfig<RowData>, 'type'>>
  >
): ItemMenuActionConfig<RowData>[] {
  return actions.map((a) => ({ ...a, key: newGuid(), type: a?.type || 'item' }));
}
