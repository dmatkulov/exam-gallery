import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import UserGalleryList from '../components/UserGalleryList';

const UserGallery: React.FC = () => {
  const dispatch = useAppDispatch();
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
      <Stack>
        {author && (
          <Typography variant="h3">{author.displayName}'s gallery</Typography>
        )}
        {author && author._id === user?._id && <Button>Delete</Button>}
      </Stack>
      {isLoading && <CircularProgress />}
      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {gallery.map((item) => (
            <UserGalleryList key={item._id} item={item} />
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default UserGallery;
