import store from '@/redux/store';
// import { setupAxios } from '@/api/_axios';
import React from 'react';
import { Provider } from 'react-redux';

// setupAxios(store);

const ReduxProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};
export default ReduxProvider;
