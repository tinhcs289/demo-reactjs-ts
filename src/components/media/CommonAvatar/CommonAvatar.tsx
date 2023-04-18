import render from '@/helpers/reactHelpers/render';
import type { CommonAvatarProps } from './_types';
import Avatar from '@mui/material/Avatar';
export default function CommonAvatar(props: CommonAvatarProps) {
  const { children, icon, iconProps, ...otherProps } = props;
  if (!!children) return <Avatar {...otherProps}>{children}</Avatar>;
  if (!!icon) return <Avatar {...otherProps}>{render(icon, iconProps)}</Avatar>;
  return <Avatar {...otherProps} />;
}
