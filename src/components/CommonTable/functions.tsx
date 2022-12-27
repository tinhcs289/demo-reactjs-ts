import newGuid from '@/helpers/stringHelpers/newGuid';
import type { TAny } from '@/_types/TAny';
import type {
  ICommonTableConfig,
  TBodyCellComponent,
  TBodyCellInnerComponent,
  TBodyCellInnerRenderFunction,
  TBodyCellRenderFunction,
  TItemMenuAction,
  TItemMenuActionComponent,
  TItemMenuActionRenderFunction,
} from './_types';

//#region Table
export const tableConfig = <T extends Record<string, any>>(
  ...headers: Array<Omit<ICommonTableConfig<T>, '_key'>>
): Array<ICommonTableConfig<T>> => {
  return headers.map((head) => ({ ...head, _key: newGuid() }));
};
export const renderCellAs =
  <T extends TAny>(Cell: TBodyCellComponent<T, TAny>): TBodyCellRenderFunction<T, TAny> =>
  (args) => {
    return <Cell {...args} />;
  };
export const renderCellInnerAs =
  <T extends TAny>(CellInner: TBodyCellInnerComponent<T, TAny>): TBodyCellInnerRenderFunction<T, TAny> =>
  (args) => {
    return <CellInner {...args} />;
  };
//#endregion

//#region ActionMenu
export const renderItemAs =
  <T extends TAny>(Item: TItemMenuActionComponent<T, TAny>): TItemMenuActionRenderFunction<T, TAny> =>
  (args) => {
    const { key, ...otherArgs } = args;
    return <Item key={key} {...otherArgs} />;
  };
export const menuActions = <T extends TAny>(
  actions: Array<Omit<TItemMenuAction<T>, 'key' | 'type'> & Partial<Pick<TItemMenuAction<T>, 'type'>>>,
): TItemMenuAction<T>[] => {
  return actions.map((a) => ({ ...a, key: newGuid(), type: a?.type || 'item' }));
};
//#endregion
