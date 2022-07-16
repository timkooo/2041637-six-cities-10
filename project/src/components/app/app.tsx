import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Property } from '../../pages/property/property';
import { PrivateRoute } from '../private-route/private-route';
import type { reviews } from '../../types/reviews';
import type { places } from '../../types/places';
import { FC } from 'react';

type AppProps = {
  reviews: reviews,
  places: places,
}

export const App: FC<AppProps> = ({reviews, places}) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main} element={<Main places={places} reviews={reviews} />} />
      <Route
        path={AppRoutes.Favorites}
        element={
          <PrivateRoute authorization={AuthorizationStatus.Auth}>
            <Favorites places={places}/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Login} element={<Login />} />
      <Route path={AppRoutes.Property} element={<Property places={places}/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
