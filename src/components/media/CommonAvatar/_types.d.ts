import type { MuiIcon, MuiIconProps } from '@/types/Mui';
import type { AvatarProps } from '@mui/material/Avatar';
export type CommonAvatarProps = AvatarProps & {
  icon?: MuiIcon;
  iconProps?: MuiIconProps;
};
