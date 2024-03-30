import React, { useCallback } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { IconButton, ImageListItemBar, styled } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Gallery } from '../../../types';
import { apiURL, routes } from '../../../utils/constants';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deletePhoto, fetchGallery } from '../galleryThunks';
import { selectDeleteLoading } from '../gallerySlice';
import { NavLink } from 'react-router-dom';

interface Props {
  item: Gallery;
}

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const GalleryList: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeleteLoading);

  let image = noCoverImage;

  if (item.image) {
    image = apiURL + '/' + item.image;
  }

  const handleDelete = useCallback(async () => {
    await dispatch(deletePhoto(item._id));
    await dispatch(fetchGallery()).unwrap();
  }, [dispatch, item._id]);

  return (
    item && (
      <ImageListItem key={item._id}>
        <img src={image} alt={item.title} loading="lazy" />
        <ImageListItemBar
          title={item.title}
          subtitle={
            <span>
              by:{' '}
              <Link to={routes.userHomePage + '/' + item.user._id}>
                {item.user.displayName}
              </Link>
            </span>
          }
          sx={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.4) 10%, ' +
              'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
          }}
          actionIcon={
            <>
              {user && user.role === 'admin' && (
                <IconButton
                  onClick={handleDelete}
                  disabled={isDeleting}
                  sx={{ color: 'rgba(255, 255, 255)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
              {user && user._id === item.user._id && (
                <IconButton
                  onClick={handleDelete}
                  disabled={isDeleting}
                  sx={{ color: 'rgba(255, 255, 255)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </>
          }
        />
      </ImageListItem>
    )
  );
};

export default GalleryList;
