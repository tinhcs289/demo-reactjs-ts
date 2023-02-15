import type { TDetailPanelComponent, TDetailPanelToggle } from '@/components/CommonTable';
import { withDetailPanel } from '@/components/CommonTable';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';
import type { TOrderListItem } from '../_types';

const Toggle: TDetailPanelToggle<TOrderListItem> = (props) => {
  const { open, toggle } = props;

  const $toggler = useMemo(() => {
    return <IconButton onClick={toggle}>{!open ? <AddIcon /> : <RemoveIcon />}</IconButton>;
  }, [open, toggle]);

  return $toggler;
};

const DetailPanel: TDetailPanelComponent<TOrderListItem> = ({ closePanel }) => {
  return (
    <Grid container sx={{ m: 0, p: 0, position: 'relative', height: '100px' }}>
      <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={closePanel}>
        <CloseIcon />
      </IconButton>
      <Grid item sx={{ w: '120px', h: '120px' }}></Grid>
    </Grid>
  );
};
const DetailPanelToggle = withDetailPanel(DetailPanel, Toggle);
export default DetailPanelToggle;
