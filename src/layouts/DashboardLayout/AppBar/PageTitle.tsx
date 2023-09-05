import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import type { CommonTypographyProps } from '@/components/typo';
import { CommonTypography } from '@/components/typo';
import render from '@/helpers/reactHelpers/render';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import { alpha, styled, useMediaQuery, useTheme } from '@mui/material';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
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
const BreadcrumbsStyled = styled(Breadcrumbs)<BreadcrumbsProps>({
  flex: 1,
  '.MuiBreadcrumbs-separator': {
    color: 'HighlightText',
    fontWeight: 700,
  },
});
export default function PageTitle() {
  const [pageTitle] = useDashboardLayout((s) => s.pageTitle);
  const [breadcrumb] = useDashboardLayout((s) => s.rootBreadcrumb);
  const theme = useTheme();
  const isSmallScreenOrLarger = useMediaQuery(theme.breakpoints.up('sm'));
  const shouldShowBreadcrumbs = useMemo(() => {
    if (!isSmallScreenOrLarger) return false;
    if (!breadcrumb) return false;
    if (!Array.isArray(breadcrumb)) return false;
    if (breadcrumb.length === 0) return false;
    return true;
  }, [isSmallScreenOrLarger, breadcrumb]);
  const $Title = useMemo(() => {
    return (
      <CommonTypography
        className="db-page-title"
        component="h1"
        variant="h6"
        color="inherit"
        maxLines={1}
        flexGrow={1}
      >
        {pageTitle}
      </CommonTypography>
    );
  }, [pageTitle]);
  const $BreadcrumbsOrTitle = useMemo(() => {
    if (!shouldShowBreadcrumbs) return $Title;
    return (
      <BreadcrumbsStyled separator="›">
        {breadcrumb?.map?.((b, i) => {
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
      </BreadcrumbsStyled>
    );
  }, [$Title, breadcrumb, shouldShowBreadcrumbs]);
  return $BreadcrumbsOrTitle;
}
