import { Box, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectFetchOneLoading,
  selectOnePhoto,
  selectPreview,
  setPreview,
} from '../gallerySlice';
import { apiURL } from '../../../utils/constants';
import CancelIcon from '@mui/icons-material/Cancel';

const PhotoPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectOnePhoto);
  const isLoading = useAppSelector(selectFetchOneLoading);
  const preview = useAppSelector(selectPreview);

  let image;

  if (item) {
    image = apiURL + '/' + item.image;
  }

  const handleClose = () => {
    dispatch(setPreview(false));
  };

  return (
    preview && (
      <Box
        sx={{
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        {item ? (
          <Box
            sx={{
              height: '700px',
              overflow: 'hidden',
              borderRadius: '12px',
              position: 'relative',
            }}
          >
            <img
              src={image}
              alt={item.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading && <CircularProgress />}
          </Box>
        )}
      </Box>
    )
  );
};

export default PhotoPreview;
