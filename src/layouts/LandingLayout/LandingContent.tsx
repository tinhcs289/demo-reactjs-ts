import Container, { ContainerProps } from '@mui/material/Container';
import React from 'react';

const LandingContent: React.FC<ContainerProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Container sx={{ py: 8 }} maxWidth="md" {...otherProps}>
      {children}
    </Container>
  );
};
export default LandingContent;
