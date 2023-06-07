import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
export type LandingBannerSubTitleProps = Omit<TypographyProps, 'ref'>;
export default function LandingBannerSubTitle(props: LandingBannerSubTitleProps) {
  const { children, ...otherProps } = props;
  return (
    <Typography variant="h5" align="center" color="text.secondary" paragraph {...otherProps}>
      {children}
    </Typography>
  );
}
