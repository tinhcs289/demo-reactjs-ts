import type { BoxProps } from '@mui/material/Box';
import type { TooltipProps } from '@mui/material/Tooltip';
export type CommonTooltipProps = TooltipProps & { childrenProps?: Omit<BoxProps, 'ref' | 'children'> };
