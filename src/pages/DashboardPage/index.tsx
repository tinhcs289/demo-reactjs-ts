import PATHS from '@/constants/paths';
import { Navigate } from 'react-router-dom';
export default function DashboardPage() {
  return <Navigate to={PATHS.demoForm} replace />;
}
