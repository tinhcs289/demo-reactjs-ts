import PATHS_AUTH from '@/constants/paths.auth';
import PATHS_DOCUMENT from '@/constants/paths.document-management';
const PATHS = {
  /**
   * @url '/not-found'
   */
  notfound: '/not-found',
  ...PATHS_AUTH,
  /**
   * @url '/module-in-development'
   */
  inDevelop: '/module-in-development',
  /**
   * @url '/dashboard'
   */
  dashboard: '/dashboard',
  ...PATHS_DOCUMENT,
  customers: '/khach-hang',
  report: '/bao-cao',
  orders: '/don-hang',
  ordersBuy: '/don-hang/don-mua',
  ordersSell: '/don-hang/don-ban',
  ordersProcess: '/don-hang/xu-ly-don-hang',
};
export default PATHS;
