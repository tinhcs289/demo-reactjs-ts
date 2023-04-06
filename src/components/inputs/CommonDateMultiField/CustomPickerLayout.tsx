import {
  PickersLayoutContentWrapper,
  PickersLayoutRoot,
  pickersLayoutClasses,
  usePickerLayout,
} from '@mui/x-date-pickers/PickersLayout';
import type { CustomPickerLayoutProps } from './_types';
export default function CustomPickerLayout(props: CustomPickerLayoutProps) {
  const { toolbar, content, actionBar } = usePickerLayout(props);
  return (
    <PickersLayoutRoot ownerState={props}>
      {toolbar}
      <PickersLayoutContentWrapper className={pickersLayoutClasses.contentWrapper}>
        {content}
      </PickersLayoutContentWrapper>
      {actionBar}
    </PickersLayoutRoot>
  );
}
