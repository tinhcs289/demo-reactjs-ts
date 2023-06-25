//@ts-nocheck --entire-file
import { createCellInnerComponent, createDetalPanel } from '@/components/table';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';
import { RowData } from '../_types';
const CellToggleDetailPanel = createCellInnerComponent(
  createDetalPanel<RowData>({
    panel: function DetailPanel({ closePanel }) {
      return (
        <Grid container sx={{ m: 0, p: 0, position: 'relative', height: '100px' }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={closePanel}>
            <CloseIcon />
          </IconButton>
          <Grid item sx={{ w: '120px', h: '120px' }}></Grid>
        </Grid>
      );
    },
    toggle: function Toggle({ open, toggle }) {
      const $Toggler = useMemo(() => {
        return <IconButton onClick={toggle}>{!open ? <AddIcon /> : <RemoveIcon />}</IconButton>;
      }, [open, toggle]);
      return $Toggler;
    },
  })
);
export default CellToggleDetailPanel;
