import { useLocation } from 'react-router-dom';
/**
 * @example 
    const queryString = useQueryString();
    const paramA = queryString.get('paramA');
 */
export default function useQueryString() {
  return new URLSearchParams(useLocation().search);
}
