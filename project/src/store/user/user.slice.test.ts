import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { InitialState, userSlice } from '../user/user.slice';

const userData = makeFakeUserData();

describe('Reducer: placesSlice', () => {
  let state: InitialState;

  beforeEach(() => {
    state = {
      userData: null,
      authorizationStatus: AuthorizationStatus.Unknown,
    };
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(
        userSlice.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({
        userData: userData,
        authorizationStatus: AuthorizationStatus.Auth,
      });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userSlice.reducer(state, { type: checkAuthAction.rejected.type })
      ).toEqual({
        userData: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(
        userSlice.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({
        userData: userData,
        authorizationStatus: AuthorizationStatus.Auth,
      });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userSlice.reducer(state, { type: loginAction.rejected.type })
      ).toEqual({
        userData: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
    });
  });

  describe('logoutAction test', () => {
    const state2 = {
      userData: userData,
      authorizationStatus: AuthorizationStatus.Auth,
    };
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userSlice.reducer(state2, { type: logoutAction.fulfilled.type })
      ).toEqual({
        userData: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
    });
  });
});
