import LandingTopBar from '@/layouts/LandingLayout/LandingTopBar';
import Content404 from '@/modules/Content404';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
export type NotFoundPageProps = {
  contentOnly?: boolean;
};
export default function NotFoundPage(props?: NotFoundPageProps) {
  const { t } = useTranslation();
  const $Content = useMemo(() => {
    if (!props?.contentOnly)
      return (
        <>
          <LandingTopBar>{t('notFound:pageNotFound')}</LandingTopBar>
          <Content404 />
        </>
      );
    return <Content404 />;
  }, [props?.contentOnly, t]);
  return $Content;
}
