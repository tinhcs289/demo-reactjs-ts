import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingBar() {
  return (
    <LinearProgress
      color="primary"
      sx={{ position: 'sticky', top: 0, left: 0, width: '100%', zIndex: (theme) => theme.zIndex.modal + 2 }}
    />
  );
}
