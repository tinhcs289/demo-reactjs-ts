import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import DialogTitle from '@mui/material/DialogTitle';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import type { CustomToolbarProps } from './_types';
import { DEFAULT_FORMAT } from './constants';
const DateContainer = styled(Grid)<GridProps>(({ theme }) => ({
  width: `${320 - 2 * 24}px`,
  height: theme.spacing(20),
  overflowY: 'scroll',
  alignContent: 'baseline',
  border: `1px solid ${theme.palette.grey[400]}`,
}));
export default function CustomToolbar(props: CustomToolbarProps) {
  const { className, label, dates, onDelete, toolbarFormat } = props;
  const length = useMemo(
    () => (!!dates?.length && Number.isInteger(dates?.length) ? Number(dates.length) : 0),
    [dates?.length]
  );
  const $Dates = useMemo(() => {
    if (!dates || dates.length === 0) return null;
    return (
      <DateContainer container>
        {dates.map((date, i) => (
          <Grid item key={i} sx={{ m: '2px' }}>
            <Chip
              label={date?.format(toolbarFormat || DEFAULT_FORMAT)}
              color="primary"
              size="small"
              onDelete={() => {
                onDelete?.(date);
              }}
            />
          </Grid>
        ))}
      </DateContainer>
    );
  }, [dates, toolbarFormat, onDelete]);
  const $Label = useMemo(
    () => <Typography color="GrayText">{`${label} (${length})`}</Typography>,
    [label, length]
  );
  return (
    <DialogTitle className={className} component="div" sx={{ pb: 0 }}>
      {$Label}
      {$Dates}
    </DialogTitle>
  );
}
