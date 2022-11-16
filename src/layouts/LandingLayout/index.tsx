import React from 'react';

const LandingLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  const content = React.useMemo(() => {
    return <>{children}</>;
  }, [children]);

  return <>{content}</>;
};
export default LandingLayout;
