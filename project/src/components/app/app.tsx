import { Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus, NameSpace } from '../../const';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Room } from '../../pages/room/room';
import { PrivateRoute } from '../private-route/private-route';
import { Place } from '../../types/place';
import { Comment } from '../../types/comment';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HistoryRouter } from '../../history-router/history-router';
import browserHistory from '../../browser-history';

type AppProps = {
  reviews?: Comment[];
  places: Place[];
};

export const App: FC<AppProps> = ({ reviews, places }) => {
  const arePlacesLoaded = useAppSelector(
    (state) => state[NameSpace.Places].arePlacesLoaded
  );

  if (!arePlacesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
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
    </HistoryRouter>
  );
};
