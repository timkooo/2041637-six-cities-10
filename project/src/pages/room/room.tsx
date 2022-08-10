import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { Places } from '../../components/places/places';
import { CommentsList } from '../../components/comments-list/comments-list';
import { AuthorizationStatus, htmlClasses, NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import {
  loadPlaceById,
  loadNearestPlaces,
  loadCommentsByPlaceId,
} from '../../store/api-actions';
import { getRating } from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';
import { PageNotFound } from '../page-not-found/page-not-found';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import CommentsForm from '../../components/comments-form/comments-form';

export const Room = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentPlace = useAppSelector(
    (state) => state[NameSpace.Places].currentPlace
  );
  const isCurrentPlaceLoaded = useAppSelector(
    (state) => state[NameSpace.Places].isCurrentPlaceLoaded
  );
  const nearestPlaces = useAppSelector(
    (state) => state[NameSpace.Places].nearestPlaces
  );
  const areNearestPlacesLoaded = useAppSelector(
    (state) => state[NameSpace.Places].areNearestPlacesLoaded
  );
  const rating = currentPlace ? getRating(currentPlace.rating) : '0%';
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (params.id) {
      dispatch(loadPlaceById(params.id));
      dispatch(loadNearestPlaces(params.id));
      dispatch(loadCommentsByPlaceId(params.id));
    }
  }, [dispatch, params.id]);

  if (!isCurrentPlaceLoaded || !areNearestPlacesLoaded) {
    return <LoadingScreen />;
  }

  if (!currentPlace || !params.id) {
    return <PageNotFound />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentPlace.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Studio" />
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
                <CommentsList />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <CommentsForm id={params.id} />
                )}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              places={nearestPlaces}
              selectedPlaceId={selectedPlaceId}
              currentPlace={currentPlace}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <Places
              places={nearestPlaces}
              onCardFocusChange={setSelectedPlaceId}
              htmlPlacesClass={htmlClasses.near}
            />
          </section>
        </div>
      </main>
    </div>
  );
};
