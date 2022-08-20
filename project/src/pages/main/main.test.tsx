import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AuthorizationStatus,
  Cities,
  NameSpace,
  SortingTypes,
} from '../../const';
import { makeFakeComments, makeFakePlaces, makeFakeUserData } from '../../utils/mocks';
import { Main } from './main';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: Main', () => {
  it('should render correctly with user not logged in', async () => {
    const history = createMemoryHistory();
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

    history.push('/Main');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByTestId('location')[1]);

    const actions = store.getActions();

    expect(actions[0].type).toBe(`${NameSpace.Application}/changeCity`);
  });

  it('should render correctly with user logged in', async () => {
    const history = createMemoryHistory();
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

    history.push('/Main');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });
});
