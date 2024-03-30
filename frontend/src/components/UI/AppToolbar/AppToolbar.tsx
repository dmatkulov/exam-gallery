import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Grid,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import { routes } from '../../../utils/constants';
import GuestMenu from './GuestMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 0,
        backgroundColor: 'white',
        textAlign: 'center',
        borderBottom: '1px solid #efefef',
        mt: 2,
        mb: '50px',
        zIndex: 1,
      }}
    >
      <Toolbar disableGutters>
        <Grid container justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color="text.primary"
            >
              <Link to={routes.home}>Photo gallery</Link>
            </Typography>
          </Stack>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
