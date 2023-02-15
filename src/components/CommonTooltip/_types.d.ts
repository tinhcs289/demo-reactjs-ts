import type { BoxProps } from '@mui/material/Box';
import type { TooltipProps } from '@mui/material/Tooltip';

export type TCommonTooltipProps = TooltipProps & { childrenProps?: Omit<BoxProps, 'ref' | 'children'> };
