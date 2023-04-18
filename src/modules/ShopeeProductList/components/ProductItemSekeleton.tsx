import Box from '@mui/material/Box';
import ProductItemGrid from './ProductItemGrid';
export default function ProductItemSekeleton() {
  return (
    <ProductItemGrid>
      <Box sx={{ height: '276.17px', background: (t) => t?.palette?.background?.paper }}></Box>
    </ProductItemGrid>
  );
}
