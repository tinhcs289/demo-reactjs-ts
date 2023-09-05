import { GlobalStylesProps } from '@mui/material/GlobalStyles';
import layoutStyleMaker from '@/themes/globalStyleMaker/layoutStyleMaker';
import scrollbarStyleMaker from '@/themes/globalStyleMaker/scrollbarStyleMaker';
const globalStyleMaker: Required<GlobalStylesProps>['styles'] = (theme) => ({
  //@ts-ignore
  ...scrollbarStyleMaker(theme),
  //@ts-ignore
  ...layoutStyleMaker(theme),
});
export default globalStyleMaker;
