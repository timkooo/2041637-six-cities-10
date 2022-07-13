import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRouts, AuthorizationStatus } from '../../const';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Property } from '../../pages/property/property';
import { Layout } from '../layout/layout';
import { PrivateRoute } from '../private-route/private-route';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRouts.Main} element={<Layout />}>
        <Route index element={<Main cardsNumber={5} />} />
        <Route
          path={AppRouts.Favorites}
          element={
            <PrivateRoute authorization={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRouts.Login} element={<Login />} />
        <Route path={AppRouts.Property} element={<Property />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
