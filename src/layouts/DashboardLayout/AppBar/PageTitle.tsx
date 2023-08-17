import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import { CommonTypography, CommonTypographyProps } from '@/components/typo';
import render from '@/helpers/reactHelpers/render';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import { alpha, styled, useMediaQuery, useTheme } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useMemo } from 'react';
const TypographyStyled = styled(CommonTypography, {
  shouldForwardProp: (p) => p !== 'isLast',
})<CommonTypographyProps & { isLast?: boolean }>(({ theme, isLast }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  opacity: isLast ? 1 : 0.7,
  fontWeight: isLast ? 400 : 200,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  ':hover': {
    opacity: 1,
    background: alpha(theme.palette.primary.dark, 0.9),
  },
}));
export default function PageTitle() {
  const [pageTitle] = useDashboardLayout((s) => s.pageTitle);
  const [breadcrumb] = useDashboardLayout((s) => s.rootBreadcrumb);
  const theme = useTheme();
  const isSmallScreenOrLarger = useMediaQuery(theme.breakpoints.up('sm'));
  const $Title = useMemo(() => {
    if (!(breadcrumb instanceof Array && breadcrumb.length > 0) || !isSmallScreenOrLarger)
      return (
        <CommonTypography component="h1" variant="h6" color="inherit" maxLines={1} sx={{ flexGrow: 1 }}>
          {pageTitle || ''}
        </CommonTypography>
      );
    return (
      <Breadcrumbs
        separator="›"
        sx={{
          flex: 1,
          '.MuiBreadcrumbs-separator': {
            color: 'HighlightText',
            fontWeight: 700,
          },
        }}
      >
        {breadcrumb.map((b, i) => {
          const isLast = i === breadcrumb.length - 1;
          return (
            <NavLinkNoStyle to={b?.url || '#'} key={i}>
              <TypographyStyled component="h1" variant="h6" color="HighlightText" noWrap isLast={isLast}>
                {!!b?.icon ? (
                  <>{render(b.icon, { ...(b?.iconProps as any), fontSize: 'small' })}&nbsp;&nbsp;</>
                ) : null}
                {b?.labelText || ''}
              </TypographyStyled>
            </NavLinkNoStyle>
          );
        })}
      </Breadcrumbs>
    );
  }, [pageTitle, breadcrumb, isSmallScreenOrLarger]);
  return $Title;
}
