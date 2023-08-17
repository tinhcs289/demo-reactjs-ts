import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Grid from '@mui/material/Grid';
import PageHeader from './PageHeader';
import PageHeaderBadge from './PageHeaderBadge';
import SearchBox from './SearchBox';
import ToolBarStyled from './ToolBarStyled';
import TopBar from './TopBar';
export default function PageTopBar() {
  return (
    <PageHeader>
      <TopBar position="relative">
        <ToolBarStyled>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={9} md={10} lg={11}>
              <SearchBox />
            </Grid>
            <Grid item xs={3} md={2} lg={1} container justifyContent="space-between">
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <PageHeaderBadge icon={LocalGroceryStoreOutlinedIcon} />
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <PageHeaderBadge icon={ForumOutlinedIcon} />
              </Grid>
            </Grid>
          </Grid>
        </ToolBarStyled>
      </TopBar>
    </PageHeader>
  );
}
