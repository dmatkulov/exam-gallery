import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { GalleryMutation } from '../../../types';
import { fetchGallery, uploadToGallery } from '../galleryThunks';
import { routes } from '../../../utils/constants';
import { Container, Typography } from '@mui/material';
import GalleryForm from '../components/GalleryForm';

const NewPhoto: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (state: GalleryMutation) => {
    try {
      await dispatch(uploadToGallery(state)).unwrap();
      await dispatch(fetchGallery());
      navigate(routes.home);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Typography gutterBottom variant="h3" textAlign="center" mb={3}>
        Upload new photo
      </Typography>

      <GalleryForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewPhoto;
