import withHOCs from '@/hocs/withHocs';
import type { AppRouterProps } from '@/routes';
import { ifAuthenticated, ifUnAuthenticated } from '@/routes';
function RootRouter(props: AppRouterProps) {
  return <></>;
}
const AppRouter = withHOCs(ifAuthenticated, ifUnAuthenticated)(RootRouter);
export default AppRouter;
