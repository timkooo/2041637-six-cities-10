/* eslint-disable no-trailing-spaces */
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../../history-router/history-router';
import {
  AuthorizationStatus,
  AppRoutes,
  Cities,
  SortingTypes,
  NameSpace,
} from '../../const';
import { App } from './app';
import {
  makeFakeComments,
  makeFakePlaces,
  makeFakeUserData,
} from '../../utils/mocks';
import thunk from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

const buildFakeApp = (store: MockStore<any, AnyAction>) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });

    history.push(AppRoutes.Main);

    render(buildFakeApp(store));

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to "/login" and authorized', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });
    
    history.push(`/${AppRoutes.Login}`);

    render(buildFakeApp(store));

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login" and not authorized', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });
    
    history.push(`/${AppRoutes.Login}`);

    render(buildFakeApp(store));

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites" and authorized', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });

    history.push(`/${AppRoutes.Favorites}`);

    render(buildFakeApp(store));

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/favorites" and not authorized', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    history.push(`/${AppRoutes.Favorites}`);

    render(buildFakeApp(store));

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/room/:id"', () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const placeId = currentPlace.id;
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: places,
        isCurrentPlaceLoaded: true,
        areNearestPlacesLoaded: true,
        currentPlace: currentPlace,
        nearestPlaces: places,
      },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: places,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });

    history.push(`/offer/${placeId}`);

    render(buildFakeApp(store));

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "PageNotFound" when user navigate to non-existent route', () => {
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: makeFakePlaces(),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });
    
    history.push('/non-existent-route');

    render(buildFakeApp(store));

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
