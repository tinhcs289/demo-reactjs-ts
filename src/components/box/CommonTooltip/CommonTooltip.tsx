import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { forwardRef } from 'react';
import type { CommonTooltipProps } from './_types';
const HtmlTooltip = styled(function HtmlTooltip({ className, ...props }: TooltipProps) {
  return <Tooltip {...props} classes={{ popper: className }} />;
})(({ theme }) => ({
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
const BoxWrap = forwardRef(function BoxWithRef(props: BoxProps, ref?: any) {
  const { children, ...others } = props;
  return (
    <Box {...others} ref={ref}>
      {children}
    </Box>
  );
});
export default function CommonTooltip(props: CommonTooltipProps) {
  const { children, childrenProps, ...others } = props;
  return (
    <HtmlTooltip {...others}>
      <BoxWrap {...childrenProps}>{children}</BoxWrap>
    </HtmlTooltip>
  );
}
