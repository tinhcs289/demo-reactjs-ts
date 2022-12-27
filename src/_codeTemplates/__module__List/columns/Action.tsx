import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import type { TAny } from '@/_types/TAny';
import { ListItemActionMenuToggle } from '../context';
import type { T__module__ListItem } from '../_types';

const Action: TBodyCellInnerComponent<T__module__ListItem, TAny> = (props) => {
  // use the hook `useAsyncList` here to interact with the List
  return <ListItemActionMenuToggle {...props} />;
};
export default Action;
