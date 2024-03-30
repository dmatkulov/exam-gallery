import { createAsyncThunk } from '@reduxjs/toolkit';
import { Gallery, GalleryResponse } from '../../types';
import { axiosRoutes } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchGallery = createAsyncThunk<Gallery[]>(
  'gallery/Fetch',
  async () => {
    const response = await axiosApi.get<Gallery[]>(axiosRoutes.gallery);

    return response.data ?? [];
  },
);

export const fetchByUser = createAsyncThunk<GalleryResponse, string>(
  'gallery/fetchByUser',
  async (id) => {
    const response = await axiosApi.get<GalleryResponse>(
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

export const deletePhoto = createAsyncThunk<void, string>(
  'gallery/delete',
  async (id) => {
    await axiosApi.delete(`${axiosRoutes.gallery}/${id}`);
  },
);
