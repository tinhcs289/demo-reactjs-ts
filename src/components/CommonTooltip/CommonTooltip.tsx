import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { ComponentType } from 'react';
import { forwardRef } from 'react';
import type { TCommonTooltipProps } from './_types';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: 'max-content',
    minWidth: 'fit-content',
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const BoxWrap = forwardRef((props: BoxProps, ref?: any) => {
  const { children, ...others } = props;
  return (
    <Box {...others} ref={ref}>
      {children}
    </Box>
  );
});

const CommonTooltip: ComponentType<TCommonTooltipProps> = (props) => {
  const { children, childrenProps, ...others } = props;
  return (
    <HtmlTooltip {...others}>
      <BoxWrap {...childrenProps}>{children}</BoxWrap>
    </HtmlTooltip>
  );
};
export default CommonTooltip;
