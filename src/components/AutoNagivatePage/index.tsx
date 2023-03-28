import { Navigate } from 'react-router-dom';
export type AutoNagivatePageProps = {
  to: string;
};
export default function AutoNagivatePage(props: AutoNagivatePageProps) {
  return <Navigate to={props?.to || ''} replace />;
}
