import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';
import { loadCommentsByPlaceId, postCommentAction } from '../api-actions';

type InitialState = {
  comments: Comment[];
  areCommentsLoaded: boolean;
};

const initialState: InitialState = {
  comments: [],
  areCommentsLoaded: false,
};

export const commentsSlice = createSlice({
  name: NameSpace.Places,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadCommentsByPlaceId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.areCommentsLoaded = true;
      })
      .addCase(loadCommentsByPlaceId.pending, (state, action) => {
        state.areCommentsLoaded = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.areCommentsLoaded = true;
      })
      .addCase(postCommentAction.pending, (state, action) => {
        state.areCommentsLoaded = false;
      });
  },
});
