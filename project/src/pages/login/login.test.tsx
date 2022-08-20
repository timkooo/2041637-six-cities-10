import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../history-router/history-router';
import { Provider } from 'react-redux';
import { Login } from './login';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppRoutes,
  AuthorizationStatus,
  Cities,
  NameSpace,
  SortingTypes,
} from '../../const';
import {
  makeFakeComments,
  makeFakePlaces,
  makeFakeUserData,
} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Login', () => {
  it('should render correctly', async () => {
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

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('login'), 'keks');
    await userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should redirect to /Main', () => {
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

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoutes.Main} element={<h1>Main Screen</h1>} />
            <Route path={AppRoutes.Login} element={<Login />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Main Screen/i)).toBeInTheDocument();
  });
});
