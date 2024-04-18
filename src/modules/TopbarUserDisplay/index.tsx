import { userRolesSelector, userSelector } from '@/redux/authentication/selectors';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
export default function TopbarUserDisplay() {
  const userInfo = useSelector(userSelector);
  const roles = useSelector(userRolesSelector);
  const userName = useMemo(() => userInfo?.displayname || '', [userInfo?.displayname]);
  const userNameFirstChar = useMemo(() => userName[0] || '', [userName]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const roleName = useMemo(() => roles?.[0]?.name || '', [roles?.[0]?.name]);
  return !userName ? null : (
    <Card elevation={0} sx={{ px: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 24, height: 24, background: (t) => t?.palette?.primary?.main }}>
            {userNameFirstChar}
          </Avatar>
        }
        title={userName}
        subheader={roleName}
        sx={{ padding: '0 !important' }}
      />
    </Card>
  );
}
