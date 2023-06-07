import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
export type LandingBannerTitleProps = Omit<TypographyProps, 'ref'>;
export default function LandingBannerTitle(props: LandingBannerTitleProps) {
  const { children, ...otherProps } = props;
  return (
    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom {...otherProps}>
      {children}
    </Typography>
  );
}
