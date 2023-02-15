import type { ComponentType } from 'react';

export default function withHOCs<TProps>(
  ...hocs: Array<(Component: ComponentType<TProps>) => ComponentType<TProps>>
) {
  return hocs.reverse().reduceRight((h, g) => (p) => h(g(p)));
}
