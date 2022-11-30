import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import type { TCommonMetaHeadProps } from './_types';

const CommonMetaHead: FC<TCommonMetaHeadProps> = (props) => {
  const { title, description, keywords } = props;
  return (
    <Helmet>
      <title>{title || ''}</title>
      {!!description ? <meta name="description" content={description} /> : null}
      {!!keywords ? <meta name="keywords" content={keywords} /> : null}
    </Helmet>
  );
};
export default CommonMetaHead;
