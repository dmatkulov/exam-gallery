import React, { useCallback } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { IconButton, ImageListItemBar, styled } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Gallery } from '../../../types';
import { apiURL, routes } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deletePhoto, fetchGallery, fetchOne } from '../galleryThunks';
import { selectDeleteLoading, setPreview } from '../gallerySlice';
import { NavLink } from 'react-router-dom';

interface Props {
  item: Gallery;
  userPage?: boolean;
}

const Link = styled(NavLink)({
  color: 'inherit',
  '&:hover': {
    color: 'inherit',
  },
});

const GalleryList: React.FC<Props> = ({ item, userPage = false }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeleteLoading);

  const image = apiURL + '/' + item.image;
  const handleDelete = useCallback(async () => {
    await dispatch(deletePhoto(item._id));
    await dispatch(fetchGallery()).unwrap();
  }, [dispatch, item._id]);

  const fetchPreview = async (id: string) => {
    await dispatch(fetchOne(id));
    dispatch(setPreview(true));
  };

  return (
    item && (
      <ImageListItem key={item._id}>
        <img
          onClick={() => fetchPreview(item._id)}
          style={{ cursor: 'pointer' }}
          src={image}
          alt={item.title}
          loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
          subtitle={
            !userPage && (
              <span>
                by{' '}
                <Link to={routes.userHomePage + '/' + item.user._id}>
                  {item.user.displayName}
                </Link>
              </span>
            )
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
