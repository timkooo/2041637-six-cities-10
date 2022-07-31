import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Hotel } from '../types/hotel';
import { AppDispatch, RootState } from '../types/store';
import { loadPlaces, setDataLoadedStatus } from './action';
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
  dispatch(setDataLoadedStatus(true));
  dispatch(loadPlaces(data));
  dispatch(setDataLoadedStatus(false));
});
