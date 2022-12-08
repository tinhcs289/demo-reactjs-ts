import { useLocation } from 'react-router-dom';
import React from 'react';

function useQueryString() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default useQueryString;
