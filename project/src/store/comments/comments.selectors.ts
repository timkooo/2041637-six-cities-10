import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectComments = (state: RootState) => state[NameSpace.Comments].comments;
export const selectAreCommentsLoaded = (state: RootState) => state[NameSpace.Comments].areCommentsLoaded;

export const selectSortedComments = createSelector(selectComments, (comments) => comments.slice(-10).reverse());
