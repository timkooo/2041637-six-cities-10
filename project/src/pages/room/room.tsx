import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CommentsForm } from '../../components/comments-form/comments-form';
import { Map } from '../../components/map/map';
import { Places } from '../../components/places/places';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { AppRoutes, htmlClasses } from '../../const';
import { useAppSelector } from '../../hooks/rtkHooks';
import { reviews } from '../../mocks/reviews';
// import { Hotel } from '../../types/hotel';
import { getRating } from '../../utils';

export const Room = () => {
  const places = useAppSelector((state) => state.places);
  const params = useParams();
  const currentPlace = places.find(
    (place) => place.id.toString() === params.id
  );
  const nearPlaces = places.filter((place) => place.id.toString() !== params.id);
  const rating = currentPlace ? getRating(currentPlace.rating) : '0%';
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  if (!currentPlace) {
    return <Navigate to="/*" />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoutes.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentPlace.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">{currentPlace.description}</h1>
                <button
                  className={`property__bookmark-button ${
                    currentPlace.isFavorite
                      ? 'property__bookmark-button--active'
                      : ''
                  } button`}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: rating }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {currentPlace.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentPlace.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentPlace.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  {currentPlace.maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">
                  &euro;{currentPlace.price}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentPlace.goods.map((item) => (
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${
                      currentPlace.host.isPro && 'property__avatar-wrapper--pro'
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={currentPlace.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {currentPlace.host.name}
                  </span>
                  <span className="property__user-status">
                    {currentPlace.host.isPro}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">{currentPlace.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <CommentsForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map places={nearPlaces} selectedPlaceId={selectedPlaceId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <Places
              places={nearPlaces}
              onCardFocusChange={setSelectedPlaceId}
              htmlPlacesClass={htmlClasses.near}
            />
          </section>
        </div>
      </main>
    </div>
  );
};
