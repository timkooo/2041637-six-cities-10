import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { api } from '../services/api';
import {checkAuthAction, loginAction, logoutAction, loadPlaces, loadPlaceById, loadNearestPlaces, loadCommentsByPlaceId, postCommentAction, loadFavorites, changeFavoriteStatus} from './api-actions';
import {APIRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {makeFakePlaces, makeFakePlace, makeFakeComment, makeFakeComments} from '../utils/mocks';
import {redirectToRoute, updatePlacesAction} from './action';
import { RootState } from '../types/store';
import { datatype } from 'faker';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      RootState,
      Action,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch loadPlaces when GET /hotels', async () => {
    const mockPlaces = makeFakePlaces();
    mockAPI
      .onGet(APIRoute.Places)
      .reply(200, mockPlaces);

    const store = mockStore();

    await store.dispatch(loadPlaces());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadPlaces.pending.type,
      loadPlaces.fulfilled.type,
    ]);
  });

  it('should dispatch loadPlaceById when GET /hotels/{hotelId}', async () => {
    const mockPlace = makeFakePlace();
    const mockPlaceId = mockPlace.id.toString();
    mockAPI
      .onGet(`${APIRoute.Places}/${mockPlaceId}`)
      .reply(200, mockPlace);

    const store = mockStore();

    await store.dispatch(loadPlaceById(mockPlaceId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadPlaceById.pending.type,
      loadPlaceById.fulfilled.type,
    ]);
  });

  it('should dispatch loadNearestPlaces when GET /hotels/{hotelId}/nearby', async () => {
    const mockPlaces = [makeFakePlace(), makeFakePlace(), makeFakePlace(), makeFakePlace()];
    const mockPlaceId = mockPlaces[0].id.toString();
    const mockFavoritePlaces = [...mockPlaces].slice(1,);
    mockAPI
      .onGet(`${APIRoute.Places}/${mockPlaceId}/nearby`)
      .reply(200, mockFavoritePlaces);

    const store = mockStore();

    await store.dispatch(loadNearestPlaces(mockPlaceId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadNearestPlaces.pending.type,
      loadNearestPlaces.fulfilled.type,
    ]);
  });

  it('should dispatch Logout when DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch loadCommentsByPlaceId when GET /comments/{hotelId}', async () => {
    const mockComments = makeFakeComments();
    const placeId = datatype.number().toString();
    mockAPI
      .onGet(`${APIRoute.Comments}/${placeId}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(loadCommentsByPlaceId(placeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadCommentsByPlaceId.pending.type,
      loadCommentsByPlaceId.fulfilled.type,
    ]);
  });

  it('should dispatch postCommentAction when POST /comments/{hotelId}', async () => {
    const mockComment = makeFakeComment();
    const placeId = datatype.number().toString();
    mockAPI
      .onPost(`${APIRoute.Comments}/${placeId}`)
      .reply(200, mockComment);

    const store = mockStore();

    await store.dispatch(postCommentAction({formData: {comment: datatype.string(), rating: '4'}, placeId: placeId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadFavorites when GET /favorite', async () => {
    const mockPlaces = makeFakePlaces();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockPlaces);

    const store = mockStore();

    await store.dispatch(loadFavorites());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadFavorites.pending.type,
      loadFavorites.fulfilled.type,
    ]);
  });

  it('should dispatch postCommentAction when POST /favorite/{hotelId}/{status}', async () => {
    const placeId = datatype.number();

    mockAPI
      .onPost(`${APIRoute.Favorite}/${placeId}/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatus({placeId: placeId, status: 1}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatus.pending.type,
      updatePlacesAction.type,
      loadFavorites.pending.type,
      changeFavoriteStatus.fulfilled.type,
    ]);
  });

});
