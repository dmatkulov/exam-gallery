import { Gallery, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deletePhoto, fetchGallery } from './galleryThunks';

interface GalleryState {
  items: Gallery[];
  item: Gallery | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
}

const initialState: GalleryState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createError: null,
  deleteLoading: false,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchGallery.fulfilled, (state, { payload: photos }) => {
        state.fetchLoading = false;
        state.items = photos;
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(deletePhoto.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const galleryReducer = gallerySlice.reducer;

export const selectGallery = (state: RootState) => state.gallery.items;
export const selectPreview = (state: RootState) => state.gallery.item;
export const selectFetchLoading = (state: RootState) =>
  state.gallery.fetchLoading;
export const selectFetchOneLoading = (state: RootState) =>
  state.gallery.fetchOneLoading;
export const selectCreateLoading = (state: RootState) =>
  state.gallery.createLoading;
export const selectCreateError = (state: RootState) =>
  state.gallery.createError;
export const selectDeleteLoading = (state: RootState) =>
  state.gallery.deleteLoading;
