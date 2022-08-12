import { Header } from '../../components/header/header';
import { PlaceCard } from '../../components/place-card/place-card';
import { useAppSelector } from '../../hooks/rtkHooks';
import { selectFavorites, selectFavoritesSorted } from '../../store/favorites/favorites.selectors';
import type { Place } from '../../types/place';

export const Favorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const favoritesSorted = useAppSelector(selectFavoritesSorted);

  return (
    <div className="page">
      <Header />
      {favorites.length === 0 ? (
        <>
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </section>
            </div>
          </main>
          <footer className="footer">
            <a className="footer__logo-link" href="main.html">
              <img
                className="footer__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="64"
                height="33"
              />
            </a>
          </footer>
        </>
      ) : (
        <>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(favoritesSorted).map(
                    ([location, places]: [string, Place[]]) =>
                      places.length !== 0 ? (
                        <li
                          className="favorites__locations-items"
                          key={location}
                        >
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{location}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {places.map((place: Place) => (
                              <PlaceCard
                                place={place}
                                key={place.id}
                                htmlClasses={{
                                  rootPlaceCardClass: 'favorites__card',
                                  imageWrapperClass: 'favorites__image-wrapper',
                                  placeCardInfoClass: 'favorites__card-info',
                                }}
                              />
                            ))}
                          </div>
                        </li>
                      ) : (
                        ''
                      )
                  )}
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img
                className="footer__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="64"
                height="33"
              />
            </a>
          </footer>
        </>
      )}
    </div>
  );
};
