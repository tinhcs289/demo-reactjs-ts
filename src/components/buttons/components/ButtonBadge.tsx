import type { BadgeProps } from '@mui/material/Badge';
import Badge from '@mui/material/Badge';
import type { ButtonCommonProps } from './ButtonCommon';
import ButtonCommon from './ButtonCommon';
export type ButtonBadgeProps = ButtonCommonProps & {
  badgeProps?: Partial<BadgeProps>;
};
export default function ButtonBadge(props: ButtonBadgeProps) {
  const { children, badgeProps, ...otherProps } = props;
  return (
    <Badge {...badgeProps}>
      <ButtonCommon color="primary" size="small" {...otherProps}>
        {children}
      </ButtonCommon>
    </Badge>
  );
}
