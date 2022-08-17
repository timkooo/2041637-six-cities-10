import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../../history-router/history-router';
import {
  AuthorizationStatus,
  AppRoutes,
  Cities,
  SortingTypes,
  NameSpace,
} from '../../const';
import { App } from './app';
import { makeFakeComments, makeFakePlaces, makeFakeUserData } from '../../utils/mocks';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Application]: {
    currentCity: Cities.Paris,
    currentSorting: SortingTypes.Popular,
  },
  [NameSpace.Comments]: { areCommentsLoaded: true, comments: makeFakeComments() },
  [NameSpace.Places]: { arePlacesLoaded: true, places: makeFakePlaces() },
  [NameSpace.Favorites]: { areFavoritesLoaded: true, favorites: makeFakePlaces() },
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userData: makeFakeUserData() },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoutes.Main);

    render(fakeApp);

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
    //expect(screen.getByText(new RegExp(`Можно допустить ${MAX_MISTAKE_COUNT}`, 'i'))).toBeInTheDocument();
  });

  // it('should render "AuthScreen" when user navigate to "/login"', () => {
  //   history.push(AppRoutes.Login);

  //   render(fakeApp);

  //   expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  // });

  // it('should render "WinScreen" when user navigate to "/result"', () => {
  //   history.push(AppRoutes.Result);

  //   render(fakeApp);

  //   expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Вы ответили правильно на 8 вопросов/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  // });

  // it('should render "GameOverScreen" when user navigate to "/lose"', () => {
  //   history.push(AppRoutes.Lose);

  //   render(fakeApp);

  //   expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  //   expect(screen.getByText(/У вас закончились все попытки. Ничего, повезёт в следующий раз!/i)).toBeInTheDocument();
  // });

  // it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
  //   history.push('/non-existent-route');

  //   render(fakeApp);

  //   expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  //   expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  // });
});
