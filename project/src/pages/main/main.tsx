import { useState } from 'react';
import { Places } from '../../components/places/places';
import { Map } from '../../components/map/map';
import { Cities, htmlClasses, NameSpace } from '../../const';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/action';
import { useAppSelector, useAppDispatch } from '../../hooks/rtkHooks';
import { selectCurrentPlaces } from '../../store/places/places.selectors';
import { selectCurrentSorting } from '../../store/application/application.selectors';
import { Sorting } from '../../components/sorting/sorting';

export const Main = () => {
  const currentCity = useAppSelector((state) => state[NameSpace.Application].currentCity);
  const currentPlaces = useAppSelector(selectCurrentPlaces);
  const currentSorting = useAppSelector(selectCurrentSorting);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleCityChange = (city: Cities) => {
    console.log(city);
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.values(Cities).map((city) => (
                <li key={city} className="locations__item">
                  <Link className="locations__item-link tabs__item" to="#">
                    <span onClick={() => handleCityChange(city)}>{city}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {currentPlaces.length !== 0 ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {currentPlaces.length} places to stay in{' '}
                  {currentCity}
                </b>
                <Sorting currentSorting={currentSorting} />
                <Places
                  places={currentPlaces}
                  onCardFocusChange={setSelectedPlaceId}
                  htmlPlacesClass={htmlClasses.cities}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    places={currentPlaces}
                    selectedPlaceId={selectedPlaceId}
                  />
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in
                    Dusseldorf
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
