import React from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';
import { Box, CircularProgress, Container } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectLogOutLoading } from '../../../features/users/usersSlice';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const logOutLoading = useAppSelector(selectLogOutLoading);

  return (
    <Container>
      <header>
        <AppToolbar />
      </header>
      <main>
        {logOutLoading && <CircularProgress />}
        <Box
          component="section"
          sx={{
            height: '100vh',
            position: 'relative',
          }}
        >
          {children}
        </Box>
      </main>
    </Container>
  );
};

export default Layout;
