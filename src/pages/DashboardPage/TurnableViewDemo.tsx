import { CommonTurnableImages } from '@/components/media/CommonTurnableImages';
import { Grid } from '@mui/material';
const images: string[] = Object.keys([...Array(18)])
  .map((_, i) => `media/turnable/ducati-multistrada-v4s-grand-tour (${i + 1}).jpg`)
  .reverse();
export default function TurnableViewDemo() {
  return (
    <Grid container width="100%" height="100%" display="flex" flexDirection="column" flex={1}>
      <CommonTurnableImages images={images} />
    </Grid>
  );
}
