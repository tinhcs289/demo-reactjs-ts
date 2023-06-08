import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';
export default function LandingContent(props: ContainerProps) {
  const { children, sx, ...otherProps } = props;
  return (
    <Container sx={{ ...sx, py: 8 }} maxWidth="md" {...otherProps}>
      {children}
    </Container>
  );
}
