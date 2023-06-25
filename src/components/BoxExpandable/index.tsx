import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
export type BoxExpandableProps = BoxProps & { expand?: boolean; contentProps?: Partial<BoxProps> };
const BoxExpandable = styled(function BoxCustom(props: BoxExpandableProps) {
  const { children, className: clsName, expand, contentProps, ...otherProps } = props;
  const className = useMemo(() => `${clsName || ''}${!!expand ? ' expand' : ''}`, [clsName, expand]);
  return (
    <Box {...otherProps} {...(!!className ? { className } : {})}>
      <Box {...contentProps}>{children}</Box>
    </Box>
  );
})<BoxExpandableProps>({
  display: 'grid',
  gridTemplateRows: '0fr',
  overflow: 'hidden',
  transition: 'grid-template-rows 200ms',
  '&.expand': {
    gridTemplateRows: '1fr',
  },
  '& > div': {
    minHeight: 0,
  },
});
export default BoxExpandable;
