import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';
import React from 'react';

const LandingContent: React.FC<ContainerProps> = (props) => {
  const { children, sx, ...otherProps } = props;
  return (
    <Container sx={{ ...sx, py: 8 }} maxWidth="md" {...otherProps}>
      {children}
    </Container>
  );
};
export default LandingContent;
