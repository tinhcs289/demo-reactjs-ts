import PATHS from '@/routes/paths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function InDevelopPage() {
  return (
    <Box sx={{ m: 0, p: 0, display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <RouterLink to={PATHS.dashboard} style={{ textDecoration: 'none' }}>
        <Button color="primary" variant="contained">{`Quay về trang chủ`}</Button>
      </RouterLink>
    </Box>
  );
}
