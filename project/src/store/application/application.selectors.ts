import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectCurrentCity = (state: RootState) => state[NameSpace.Application].currentCity;
export const selectCurrentSorting = (state: RootState) => state[NameSpace.Application].currentSorting;
