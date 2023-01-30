export type TPagingState = {
  pageIndex: number;
  pageSize: number;
};

export type TSortDirect = 'ASC' | 'DESC';

export type TSortState = {
  sortBy: string;
  sortDirection: TSortDirect;
};

export type TQueryExtendParams = {
  [x: string]: any;
};

export type TListState = { totalCount: number; moreFilter: TQueryExtendParams } & TPagingState &
  Partial<TSortState>;

export type TOnQueryArgs = {
  pagination: TPagingState;
  sort?: TSortState;
  moreFilter?: TQueryExtendParams;
};

export type TOnQueryLocalyArgs = {
  sort?: TSortState;
  moreFilter?: TQueryExtendParams;
};

export type TOnQueryRetuns<T> = {
  result: T[];
  totalCount: number;
};

export interface IUseStaticListStateParams<T extends { [x: string]: any }> {
  source?: T[];
  onQueryLocaly?: (args: TOnQueryLocalyArgs) => T[];
  idField?: string;
  defaultSelectable?: boolean;
  defaultPagination?: Partial<TPagingState> & { totalCount?: number };
  defaultSort?: Partial<TSortState>;
  defaultExtendQueryParams?: TQueryExtendParams;
  fixedExtendQueryParams?: TQueryExtendParams;
}

export interface IUseStaticListStateReturnsState<T extends { [x: string]: any }> {
  data: T[];
  listState: TListState;
  selectedItems: T[];
  isCheckAll: boolean;
  interactItem: T | null;
  anchorEl: any;
  selectable: boolean;
  isShowMultiAction: () => boolean;
  isSelected: (item: T) => boolean;
}

export interface IUseListStateReturnsControl<T extends { [x: string]: any }> {
  updatePaging: (page: number, size: number) => Promise<void>;
  updateSort: (sortBy: string, sortDirection: TSortDirect) => void;
  updateFilter: (filter: TQueryExtendParams) => void;
  reload: () => void;
  toggleSelectable: (isOn: boolean) => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
  clearSelectItems: () => void;
  checkOneItem: (item: T) => void;
  checkAllItems: (checked: boolean) => void;
}

export interface IUseListStateReturnsAction<T extends { [x: string]: any }> {
  is: (action: string) => boolean;
  isItemInteractAction: (action: string) => boolean;
  isItemInteractWithAnchorAction: (action: string) => boolean;
  clear: () => void;
  set: (actionDetail: {
    action: string;
    item?: T;
    element?: any;
    keepAnchor?: boolean;
    keepInteract?: boolean;
  }) => void;
}

export interface IUseListStateReturnsCommon<T extends { [x: string]: any }> {
  isCreate: () => boolean;
  openCreation: (detail: {
    item?: T | undefined;
    keepAnchor?: boolean | undefined;
    keepInteract?: boolean | undefined;
  }) => void;
  isDelete: () => boolean;
  openDeleteConfirm: (detail: { item: T; keepAnchor?: boolean }) => void;
  isDetail: () => boolean;
  openDetail: (detail: { item: T; keepAnchor?: boolean; keepInteract?: boolean }) => void;
  isMoreAction: () => boolean;
  openMoreActionMenu: (detail: {
    item?: T;
    element?: any;
    keepInteract?: boolean;
    keepAnchor?: boolean;
  }) => void;
}

export interface IUseStaticListStateReturns<T extends { [x: string]: any }> {
  state: IUseStaticListStateReturnsState<T>;
  control: IUseListStateReturnsControl<T>;
  action: IUseListStateReturnsAction<T>;
  common?: IUseListStateReturnsCommon<T>;
}

export type TStaticListStore<T extends { [x: string]: any }> = {
  data: T[];
  listState: TListState;
  interactItem: T | null;
  anchorEl: any;
  itemAction: string | null;
  selectable: boolean;
  selectedItems: T[];
  checkAll: boolean;
};
