import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * @example  
   const Counter = React.memo((props) => {
     useWhyDidYouUpdate("Counter", props);
     return <div style={props.style}>{props.count}</div>;
   });
 */
function useWhyDidYouUpdate<T extends { [x: string]: any }>(name: string, props: T) {
  const previousProps = useRef<T>();
  useEffect(() => {
    if (!!previousProps?.current) {
      const allKeys = Object.keys({ ...previousProps?.current, ...props });
      const changesObj = {} as { [x: string]: any };
      allKeys.forEach((key) => {
        if (isEqual((previousProps.current as T)[key], props[key])) return;
        changesObj[key] = {
          from: (previousProps.current as T)[key],
          to: props[key],
        };
      });
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    previousProps.current = props;
  });
}
export default useWhyDidYouUpdate;
