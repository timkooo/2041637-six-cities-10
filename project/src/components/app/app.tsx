import { Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Room } from '../../pages/room/room';
import { PrivateRoute } from '../private-route/private-route';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import { selectArePlacesLoaded } from '../../store/places/places.selectors';
import {
  checkAuthAction,
  loadFavorites,
  loadPlaces,
} from '../../store/api-actions';

export const App = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const arePlacesLoaded = useAppSelector(selectArePlacesLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(loadFavorites());
    }
  }, [authorizationStatus, dispatch]);

  if (!arePlacesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<Main />} />
      <Route
        path={AppRoutes.Favorites}
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Login} element={<Login />} />
      <Route path={AppRoutes.Room} element={<Room />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
