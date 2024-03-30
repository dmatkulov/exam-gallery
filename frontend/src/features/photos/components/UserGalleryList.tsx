import React, { useCallback } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { IconButton, ImageListItemBar } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Gallery } from '../../../types';
import { apiURL } from '../../../utils/constants';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deletePhoto, fetchByUser, fetchOne } from '../galleryThunks';
import { selectDeleteLoading, setPreview } from '../gallerySlice';

interface Props {
  item: Gallery;
}

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
    await dispatch(fetchByUser(item.user._id)).unwrap();
  }, [dispatch, item._id, item.user._id]);

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
