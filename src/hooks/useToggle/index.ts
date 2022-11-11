import { useCallback, useState } from 'react';

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((value?: boolean): void => {
    if (value === true) {
      setState(true);
      return;
    }

    if (value === false) {
      setState(false);
      return;
    }

    setState((state) => !state);
    return;
  }, []);
  return [state, toggle];
};
export default useToggle;
