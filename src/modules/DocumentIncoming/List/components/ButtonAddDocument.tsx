import { ButtonPositive } from '@/components/buttons';
import AddIcon from '@mui/icons-material/Add';
export default function ButtonAddDocument() {
  return <ButtonPositive startIcon={<AddIcon />} noWrap>{`Vào sổ văn bản`}</ButtonPositive>;
}
