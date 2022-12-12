import isEqual from 'lodash/isEqual';
import { useRef, useEffect } from 'react';

/**
 * @example 
    function MyComponent({ obj }) {
        const [state, setState] = useState();
        // Use the previous obj value if the "id" property hasn't changed
        const objFinal = useMemoCompare(obj, (prev, next) => {
            return prev && prev.id === next.id;
        });
        // Here we want to fire off an effect if objFinal changes.
        // If we had used obj directly without the above hook and obj was technically a
        // new object on every render then the effect would fire on every render.
        // Worse yet, if our effect triggered a state change it could cause an endless loop
        // where effect runs -> state change causes rerender -> effect runs -> etc ...
        useEffect(() => {
            // Call a method on the object and set results to state
            return objFinal.someMethod().then((value) => setState(value));
        }, [objFinal]);
        // So why not pass [obj.id] as the dependency array instead?
        useEffect(() => {
            // Then eslint-plugin-hooks would rightfully complain that obj is not in the
            // dependency array and we'd have to use eslint-disable-next-line to work around that.
            // It's much cleaner to just get the old object reference with our custom hook.
            return obj.someMethod().then((value) => setState(value));
        }, [obj.id]);
        return <div> ... </div>;
    }
 */
const useMemoCompare = <T>(next: T, compare?: (p: T, n: T) => boolean) => {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const _isEqual = !compare ? isEqual(previous as T, next) : compare(previous as T, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!_isEqual) {
      previousRef.current = next as any;
    }
  });
  // Finally, if equal then return the previous value
  return (_isEqual ? previous : next) as T;
};
export default useMemoCompare;
