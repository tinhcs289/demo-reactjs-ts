import LinearProgress from '@mui/material/LinearProgress';

const LoadingBar = () => {
  return (
    <LinearProgress
      color="primary"
      sx={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: (theme) => theme.zIndex.modal + 2 }}
    />
  );
};
export default LoadingBar;
