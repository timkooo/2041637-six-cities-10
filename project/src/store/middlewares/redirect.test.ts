import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {RootState} from '../../types/store';
import { AppRoutes } from '../../const';
import thunk from 'redux-thunk';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect, thunk];
const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoutes.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoutes.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoutes.Login),
    ]);
  });

  it('should not to be redirect /favorites because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoutes.Favorites});
    expect(fakeHistory.location.pathname).not.toBe(AppRoutes.Favorites);
  });
});
