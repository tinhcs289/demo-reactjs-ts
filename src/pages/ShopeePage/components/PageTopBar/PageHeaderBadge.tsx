import render from '@/helpers/reactHelpers/render';
import { TMuiIcon } from '@/_types/TMuiIcon';
import type { SxProps, Theme } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';

export default function PageHeaderBadge(props: { icon?: TMuiIcon }) {
  const sx: SxProps<Theme> = useMemo(
    () => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: (t) => t?.spacing?.(1),
        padding: (t) => t?.spacing?.(0, 0.5),
        color: (t) => t?.palette?.primary?.contrastText,
        background: (t) => t?.palette?.primary?.dark,
        border: (t) => `1px solid ${t?.palette?.primary?.contrastText}`,
      },
    }),
    [],
  );

  return (
    <IconButton color="inherit">
      <Badge badgeContent={123} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} sx={sx}>
        {render(props?.icon)}
      </Badge>
    </IconButton>
  );
}
