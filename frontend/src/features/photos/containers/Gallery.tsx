import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchLoading, selectGallery } from '../gallerySlice';
import { Box, CircularProgress, ImageList } from '@mui/material';
import { fetchGallery } from '../galleryThunks';
import GalleryList from '../components/GalleryList';

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const gallery = useAppSelector(selectGallery);
  const isLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  return (
    <>
      {isLoading && <CircularProgress />}
      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {gallery.map((item) => (
            <GalleryList key={item._id} item={item} />
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default Gallery;
