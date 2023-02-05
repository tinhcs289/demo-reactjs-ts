import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import asideMenuItems from '@/constants/asideMenuItems';
import render from '@/helpers/reactHelpers/render';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const data = asideMenuItems[0]?.childs || [];

function Item(props: { item: TAsideMenuItem }) {
  return (
    <NavLinkNoStyle to={props?.item?.url}>
      <ListItem
        sx={{
          background: (t) => t?.palette?.background?.paper,
          borderRadius: (t) => t?.spacing?.(0.5),
          boxShadow: (t) => t?.shadows?.[3],
        }}
      >
        <ListItemIcon>{render(props?.item?.icon, props?.item?.iconProps)}</ListItemIcon>
        <ListItemText
          sx={{ mt: 0, mb: 0 }}
          primary={props?.item?.label || ''}
          primaryTypographyProps={{ noWrap: true, sx: { fontWeight: 500 } }}
        />
        <ArrowRightAltIcon />
      </ListItem>
    </NavLinkNoStyle>
  );
}

export default function DashboardPage() {
  return (
    <FormGridContainer>
      {data.map((item) => (
        <FormGridItem key={item.id} xs={12} md={3} sx={{ p: 1 }}>
          <Item item={item} />
        </FormGridItem>
      ))}
    </FormGridContainer>
  );
}
