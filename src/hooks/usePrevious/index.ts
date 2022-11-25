import { useEffect, useRef } from 'react';

/**
 * @example
  function App() {
    // State value and setter for our example
    const [count, setCount] = useState<number>(0);
    // Get the previous value (was passed into hook on last render)
    const prevCount: number = usePrevious<number>(count);
    // Display both current and previous count value
    return (
      <div>
        <h1>
          Now: {count}, before: {prevCount}
        </h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }
 */
const usePrevious = <T>(value: T): T => {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
export default usePrevious;
