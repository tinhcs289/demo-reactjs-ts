import PATHS from '@/routes/paths';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  return <Navigate to={PATHS.dashboard1} replace />;
}
