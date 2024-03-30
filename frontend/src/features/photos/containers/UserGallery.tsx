import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectAuthor,
  selectFetchLoading,
  selectGallery,
} from '../gallerySlice';
import { fetchByUser } from '../galleryThunks';
import {
  Box,
  Button,
  CircularProgress,
  ImageList,
  Stack,
  Typography,
} from '@mui/material';
import { selectUser } from '../../users/usersSlice';
import { routes } from '../../../utils/constants';
import GalleryList from '../components/GalleryList';

const UserGallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const author = useAppSelector(selectAuthor);

  const { id } = useParams() as { id: string };

  const gallery = useAppSelector(selectGallery);
  const isLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchByUser(id));
  }, [dispatch, id]);

  return (
    <>
      <Stack direction="row" alignItems="center" mb={6}>
        {author && (
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            {author.displayName}'s gallery
          </Typography>
        )}
        {author && author._id === user?._id && (
          <Button variant="contained" onClick={() => navigate(routes.newPhoto)}>
            Upload a photo
          </Button>
        )}
      </Stack>
      {isLoading && <CircularProgress />}
      <Box sx={{ height: 800, overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {gallery.map((item) => (
            <GalleryList key={item._id} item={item} userPage />
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default UserGallery;
