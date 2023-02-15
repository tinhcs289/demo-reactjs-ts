import type { ComponentType } from 'react';
import { Helmet } from 'react-helmet';
import type { TCommonMetaHeadProps } from './_types';

const CommonMetaHead: ComponentType<TCommonMetaHeadProps> = (props) => {
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
