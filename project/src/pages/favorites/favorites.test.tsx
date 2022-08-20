import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {
  makeFakeComments,
  makeFakePlaces,
  makeFakeUserData,
} from '../../utils/mocks';
import { Favorites } from './favorites';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {
  AppRoutes,
  AuthorizationStatus,
  Cities,
  NameSpace,
  SortingTypes,
} from '../../const';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../history-router/history-router';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../../components/private-route/private-route';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

describe('Component: Favorites', () => {
  it('should render "Favorites" with places', async () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: {
        arePlacesLoaded: true,
        places: places,
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByTestId('bookmark_button')[1]);

    const actions = store.getActions();

    expect(actions[0].type).toBe(
      `${NameSpace.Favorites}/changeFavoriteStatus/pending`
    );
  });

  it('should render "Favorites" empty', () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: {
        arePlacesLoaded: true,
        places: places,
        isCurrentPlaceLoaded: true,
        areNearestPlacesLoaded: true,
        currentPlace: currentPlace,
        nearestPlaces: places,
      },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: false,
        favorites: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Save properties to narrow down search or plan your future trips./i
      )
    ).toBeInTheDocument();
  });

  it('should redirect to /Login', async () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
      },
      [NameSpace.Places]: {
        arePlacesLoaded: true,
        places: places,
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
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    history.push('/favorites');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoutes.Login} element={<h1>Login Screen</h1>} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login Screen/i)).toBeInTheDocument();
  });
});
