import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Hotel } from '../types/hotel';
import { AppDispatch, RootState } from '../types/store';
import { loadPlaces, setAreHotelsLoaded, setCurrentPlace, setIsCurrentPlaceLoaded } from './action';
import { api } from './store';

export const fetchPlacesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchPlaces', async (_arg, { dispatch }) => {
  const { data } = await api.get<Hotel[]>(APIRoute.Places);
  dispatch(setAreHotelsLoaded(false));
  dispatch(loadPlaces(data));
  dispatch(setAreHotelsLoaded(true));
});

// export const fetchPlaceById = createAsyncThunk(
//   'data/fetchPlaceById',
//   async (hotelId: string | undefined) => {
//     const { data } = await api.get<Hotel>(`${APIRoute.Places}/${hotelId}`);
//     return data;
//   }
// );

export const fetchPlaceById = createAsyncThunk<
  void,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchPlaceById', async (hotelId: string | undefined, { dispatch }) => {
  const { data } = await api.get<Hotel>(`/hotels/${hotelId}`);
  dispatch(setIsCurrentPlaceLoaded(false));
  dispatch(setCurrentPlace(data));
  dispatch(setIsCurrentPlaceLoaded(true));
});
