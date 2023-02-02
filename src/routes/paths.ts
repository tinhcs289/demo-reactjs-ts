const PATHS = {
  //#region Auth
  login: '/auth/login',
  logout: '/auth/logout',
  register: '/auth/register',
  forgetPassword: '/auth/forget-password',
  //#endregion
  //#region Private
  dashboard: '/dashboard',
  dashboard1: '/dashboard-1',
  dashboard2: '/dashboard-2',
  dashboard3: '/dashboard-3',
  dashboard4: '/dashboard-4',
  ramdom1: '/ramdom-1',
  ramdom2: '/ramdom-2',
  inDevelop: '/module-in-development',
  inDevelop1: '/module-in-development-1',
  inDevelop2: '/module-in-development-2',
  inDevelop3: '/module-in-development-3',
  //#endregion
  //#region Public
  shopee: '/shopee',
  shopeeProductDetail: '/shopee/san-pham/:productName/:productId',
  notfound: '/not-found',
  //#endregion
};
export default PATHS;
