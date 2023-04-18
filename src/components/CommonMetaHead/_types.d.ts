import type { HTMLAttributes, ReactNode } from 'react';
export type MetaTagProps = HTMLAttributes<'meta'> & {
  name?: string;
  content?: string;
  charset?: string;
  property?: string;
  httpEquiv?: string;
}
export type LinkTagProps = HTMLAttributes<'link'> & {
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  referrerpolicy?: string;
  rel?: string;
  sizes?: string;
  title?: string;
  type?: string;
}
export type CommonMetaHeadProps = {
  title: string;
  meta?: MetaTagProps[];
  links?: LinkTagProps[];
  children?: ReactNode
};