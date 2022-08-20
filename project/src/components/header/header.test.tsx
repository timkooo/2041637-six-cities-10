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
  makeFakePlaces,
  makeFakeUserData,
} from '../../utils/mocks';
import { Header } from './header';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly with user logged in', () => {
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
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });

  it('should render correctly with user logged out', () => {
    const places = makeFakePlaces();
    const store = mockStore({
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: places,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });
});
