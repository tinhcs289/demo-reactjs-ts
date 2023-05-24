import CommonImage from '@/components/media/CommonImage';
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
    idField: 'itemid',
    panel: function DetailPanel({ closePanel, row }) {
      return (
        <Grid container sx={{ m: 0, p: 0, position: 'relative', height: '240px' }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={closePanel}>
            <CloseIcon />
          </IconButton>
          <Grid item sx={{ h: '100%', width: 'calc(100% -42px)', overflowX: 'auto' }} container>
            {!!row?.images &&
              row.images.map((image) => (
                <Grid item key={image} sx={{ m: '2px' }}>
                  <CommonImage src={`https://cf.shopee.vn/file/${image}`} width={100} />
                </Grid>
              ))}
          </Grid>
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
