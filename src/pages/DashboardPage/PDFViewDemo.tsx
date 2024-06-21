import wait from '@/helpers/asyncHelpers/wait';
import { Grid } from '@mui/material';
import { lazy } from 'react';
import file from '@/components/media/CommonPDF/mock.json';
const FileView = lazy(() => wait().then(() => import('@/components/media/CommonPDF')));
export default function PDFViewDemo() {
  return (
    <Grid container width="100%" height="100%" display="flex" flexDirection="column" flex={1}>
      <FileView fileBase64Value={file.fileContent} />
    </Grid>
  );
}
