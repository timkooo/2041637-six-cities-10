import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectAuthorizationStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
export const selectUserData = (state: RootState) => state[NameSpace.User].userData;
