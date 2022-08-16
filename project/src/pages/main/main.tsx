import { useState } from 'react';
import { Places } from '../../components/places/places';
import { Map } from '../../components/map/map';
import { Cities, htmlClasses } from '../../const';
import { changeCity } from '../../store/application/application.slice';
import { useAppSelector, useAppDispatch } from '../../hooks/rtkHooks';
import { selectCurrentPlaces } from '../../store/places/places.selectors';
import { selectCurrentCity, selectCurrentSorting } from '../../store/application/application.selectors';
import { Sorting } from '../../components/sorting/sorting';
import { Header } from '../../components/header/header';
import classNames from 'classnames';

export const Main = () => {
  const currentCity = useAppSelector(selectCurrentCity);
  const currentPlaces = useAppSelector(selectCurrentPlaces);
  const currentSorting = useAppSelector(selectCurrentSorting);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleCityChange = (city: Cities) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.values(Cities).map((city) => (
                <li key={city} className="locations__item">
                  <a className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city === currentCity})} onClick={() => handleCityChange(city)}>
                    <span>{city}</span>
                  </a>
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
