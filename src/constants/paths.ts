const PATHS = {
  /**
   * @url '/not-found'
   */
  notfound: '/not-found',
  //#region Auth
  /**
   * @url '/auth/login'
   */
  login: '/auth/login',
  /**
   * @url '/auth/logout'
   */
  logout: '/auth/logout',
  /**
   * @url '/auth/register'
   */
  register: '/auth/register',
  /**
   * @url '/auth/activate-your-account'
   */
  userAccountActivate: '/auth/activate-your-account',
  /**
   * @url '/auth/forget-password'
   */
  forgetPassword: '/auth/forget-password',
  /**
   * @url '/auth/*'
   */
  authNotFound: '/auth/*',
  //#endregion
  //#region Private
  //#region -- Dashboard
  /**
   * @url '/dashboard'
   */
  dashboard: '/dashboard',
  /**
   * @url '/dashboard/demo-form'
   */
  demoForm: '/dashboard/demo-form',
  /**
   * @url '/dashboard/demo-data-table'
   */
  demoTable: '/dashboard/demo-data-table',
  /**
   * @url '/dashboard/demo-data-grid'
   */
  demoDataGrid: '/dashboard/demo-data-grid',
  /**
   * @url '/dashboard/demo-data-carousel'
   */
  demoCarousel: '/dashboard/demo-data-carousel',
  /**
   * @url '/dashboard/demo-google-map'
   */
  demoGoogleMap: '/dashboard/demo-google-map',
  //#endregion
  customers: '/khach-hang',
  report: '/bao-cao',
  //#region -- Order
  orders: '/don-hang',
  ordersBuy: '/don-mua',
  ordersSell: '/don-ban',
  ordersProcess: '/xu-ly-don-hang',
  //#endregion
  //#region -- In-Development
  inDevelop: '/module-in-development',
  //#endregion
  //#endregion
  //#region Public
  //#region  -- Shopee demo
  /**
   * @url '/shopee'
   */
  shopee: '/shopee',
  /**
   * @url '/shopee/san-pham/:productName/:productId'
   */
  shopeeProductDetail: '/shopee/san-pham/:productName/:productId',
  //#endregion
  //#endregion
};
export default PATHS;
