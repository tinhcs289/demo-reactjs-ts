import React from 'react';

const withHOCs = <TProps,>(...hocs: Array<(FC: React.FC<TProps>) => (props: TProps) => JSX.Element>) => {
  return hocs.reduceRight((h, g) => (p) => h(g(p)));
};
export default withHOCs;
