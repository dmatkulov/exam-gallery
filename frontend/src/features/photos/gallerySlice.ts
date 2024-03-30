import { Gallery, UserInfo, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  deletePhoto,
  fetchByUser,
  fetchGallery,
  fetchOne,
  uploadToGallery,
} from './galleryThunks';

interface GalleryState {
  items: Gallery[];
  item: Gallery | null;
  author: UserInfo | null;
  fetchLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
  preview: boolean;
}

const initialState: GalleryState = {
  items: [],
  item: null,
  author: null,
  fetchLoading: false,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  preview: false,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setPreview: (state, { payload }) => {
      state.preview = payload;
    },
  },
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
      .addCase(fetchByUser.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByUser.fulfilled, (state, { payload: photos }) => {
        state.fetchLoading = false;
        state.items = photos.result;
        state.author = photos.user;
      })
      .addCase(fetchByUser.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOne.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOne.fulfilled, (state, { payload: photo }) => {
        state.fetchLoading = false;
        state.item = photo;
      })
      .addCase(fetchOne.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(uploadToGallery.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(uploadToGallery.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(uploadToGallery.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
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
export const { setPreview } = gallerySlice.actions;
export const selectGallery = (state: RootState) => state.gallery.items;
export const selectOnePhoto = (state: RootState) => state.gallery.item;
export const selectFetchLoading = (state: RootState) =>
  state.gallery.fetchLoading;
export const selectPreview = (state: RootState) => state.gallery.preview;
export const selectAuthor = (state: RootState) => state.gallery.author;
export const selectCreateLoading = (state: RootState) =>
  state.gallery.createLoading;
export const selectCreateError = (state: RootState) =>
  state.gallery.createError;
export const selectDeleteLoading = (state: RootState) =>
  state.gallery.deleteLoading;
