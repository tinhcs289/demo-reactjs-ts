import { useCallback, useState } from 'react';

/**
 * @example
   function App() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();
    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
  }
 */
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
