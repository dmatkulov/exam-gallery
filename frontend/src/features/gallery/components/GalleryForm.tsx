import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCreateError, selectCreateLoading } from '../gallerySlice';
import { GalleryMutation } from '../../../types';
import { Box, Grid, TextField } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSubmit: (state: GalleryMutation) => void;
}

const GalleryForm: React.FC<Props> = ({ onSubmit }) => {
  const error = useAppSelector(selectCreateError);
  const isCreating = useAppSelector(selectCreateLoading);

  const [state, setState] = useState<GalleryMutation>({
    title: '',
    image: null,
  });

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Box component="form" onSubmit={onSubmitForm}>
      <Grid container item xs={6} direction="column" spacing={2} mx="auto">
        <Grid item xs>
          <TextField
            fullWidth
            type="text"
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            name="image"
            label="Image"
            getFieldError={getFieldError}
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <LoadingButton
            type="submit"
            loading={isCreating}
            disableElevation
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={isCreating}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GalleryForm;
