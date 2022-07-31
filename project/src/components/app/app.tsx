import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Room } from '../../pages/room/room';
import { PrivateRoute } from '../private-route/private-route';
import { Hotel } from '../../types/hotel';
import { Comment } from '../../types/comment';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  reviews?: Comment[];
  places: Hotel[];
};

export const App: FC<AppProps> = ({ reviews, places }) => {
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  if (isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorization={AuthorizationStatus.Auth}>
              <Favorites places={places} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Room} element={<Room />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
