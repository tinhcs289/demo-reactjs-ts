export type RowData = {
  id?: string;
  workGroupId?: string;
  quotationId?: string;
  name?: string;
  bookingCode?: string;
  totalPrice?: number;
  userProcess?: number;
  processUserName?: string;
  priceProfit?: number;
  status?: number;
  customerId?: string;
  customerName?: string;
  customGroupId?: string;
  customGroupName?: string;
  paymentMethod?: 1 | 2 | 3;
  buyOrSell?: 1 | 2;
  supplierId?: string;
  supplierName?: string;
  totalPassenger?: number;
  totalAdult?: number;
  totalChild?: number;
  totalInf?: number;
  version?: number;
  startDate?: string;
  active?: boolean;
  createdDate?: string;
  createdBy?: number;
  modifiedBy?: number;
  modifiedDate?: string;
  deletedBy?: number;
  deletedDate?: string;
  isDeleted?: boolean;
  bookingServices?: string[];
};
