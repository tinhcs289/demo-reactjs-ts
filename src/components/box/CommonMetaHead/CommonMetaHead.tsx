import { Helmet } from 'react-helmet';
import type { CommonMetaHeadProps } from './_types';
export default function CommonMetaHead(props: CommonMetaHeadProps) {
  const { title, meta, links, children } = props;
  return (
    <Helmet>
      <title>{title || ''}</title>
      {meta instanceof Array
        ? meta.map((tag, i) => {
            const { name, content, charset, httpEquiv, ...otherTagProps } = tag || {};
            return (
              <meta
                key={i}
                {...(!!name ? { name } : {})}
                {...(!!content ? { content } : {})}
                {...(!!charset ? { charset } : {})}
                {...(!!httpEquiv ? { 'http-equiv': httpEquiv } : {})}
                {...(otherTagProps as any)}
              />
            );
          })
        : null}
      {links instanceof Array
        ? links.map((link, i) => {
            const {
              crossorigin,
              href,
              hreflang,
              media,
              referrerpolicy,
              rel,
              sizes,
              title,
              type,
              ...otherLinkProps
            } = link || {};
            return (
              <link
                key={i}
                {...(!!crossorigin ? { crossorigin } : {})}
                {...(!!href ? { href } : {})}
                {...(!!hreflang ? { hreflang } : {})}
                {...(!!media ? { media } : {})}
                {...(!!referrerpolicy ? { referrerpolicy } : {})}
                {...(!!rel ? { rel } : {})}
                {...(!!sizes ? { sizes } : {})}
                {...(!!title ? { title } : {})}
                {...(!!type ? { type } : {})}
                {...(otherLinkProps as any)}
              />
            );
          })
        : null}
      {children}
    </Helmet>
  );
}
