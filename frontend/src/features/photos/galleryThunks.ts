import { createAsyncThunk } from '@reduxjs/toolkit';
import { Gallery } from '../../types';
import { axiosRoutes } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchGallery = createAsyncThunk<Gallery[]>(
  'gallery/Fetch',
  async () => {
    const response = await axiosApi.get<Gallery[]>(axiosRoutes.gallery);

    return response.data ?? [];
  },
);

export const deletePhoto = createAsyncThunk<void, string>(
  'gallery/delete',
  async (id) => {
    await axiosApi.delete(`${axiosRoutes.gallery}/${id}`);
  },
);
