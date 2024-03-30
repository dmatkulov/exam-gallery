import React from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';
import { Box, CircularProgress, Container } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectLogOutLoading } from '../../../features/users/usersSlice';
import { selectPreview } from '../../../features/photos/gallerySlice';
import PhotoPreview from '../../../features/photos/components/PhotoPreview';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const logOutLoading = useAppSelector(selectLogOutLoading);
  const preview = useAppSelector(selectPreview);

  return (
    <Container>
      {preview && <PhotoPreview />}
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
