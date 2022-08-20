import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {
  AuthorizationStatus,
  NameSpace,
} from '../../const';
import { HistoryRouter } from '../../history-router/history-router';
import {
  makeFakePlace,
  makeFakePlaces,
  makeFakeUserData,
} from '../../utils/mocks';
import { PlaceCard } from './place-card';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  it('should render correctly with premium status', () => {
    const fakePlace = makeFakePlace();
    fakePlace.isPremium = true;
    const places = makeFakePlaces();
    const store = mockStore({
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
          <PlaceCard place={fakePlace} htmlClasses={{}}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render correctly without premium status', () => {
    const fakePlace = makeFakePlace();
    fakePlace.isPremium = false;
    const places = makeFakePlaces();
    const store = mockStore({
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
          <PlaceCard place={fakePlace} htmlClasses={{}}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
