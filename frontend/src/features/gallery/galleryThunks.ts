import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Gallery,
  GalleryMutation,
  UserGallery,
  ValidationError,
} from '../../types';
import { axiosRoutes } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';
import { isAxiosError } from 'axios';

export const fetchGallery = createAsyncThunk<Gallery[]>(
  'gallery/Fetch',
  async () => {
    const response = await axiosApi.get<Gallery[]>(axiosRoutes.gallery);

    return response.data ?? [];
  },
);

export const fetchByUser = createAsyncThunk<UserGallery, string>(
  'gallery/fetchByUser',
  async (id) => {
    const response = await axiosApi.get<UserGallery>(
      axiosRoutes.gallery + '?author=' + id,
    );

    return response.data ?? [];
  },
);

export const fetchOne = createAsyncThunk<Gallery, string>(
  'gallery/fetchOne',
  async (id: string) => {
    const response = await axiosApi.get<Gallery>(
      `${axiosRoutes.gallery}/${id}`,
    );
    return response.data;
  },
);

export const uploadToGallery = createAsyncThunk<
  void,
  GalleryMutation,
  { rejectValue: ValidationError }
>('gallery/upload', async (galleryMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('title', galleryMutation.title);

    if (galleryMutation.image) {
      formData.append('image', galleryMutation.image);
    }

    await axiosApi.post(axiosRoutes.gallery, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deletePhoto = createAsyncThunk<void, string>(
  'gallery/delete',
  async (id) => {
    await axiosApi.delete(`${axiosRoutes.gallery}/${id}`);
  },
);
