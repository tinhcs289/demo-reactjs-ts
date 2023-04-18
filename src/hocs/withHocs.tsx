import type { ComponentType } from 'react';
export default function withHOCs<Props>(
  ...hocs: Array<(Component: ComponentType<Props>) => ComponentType<Props>>
) {
  return hocs.reverse().reduceRight((h, g) => (p) => h(g(p)));
}
