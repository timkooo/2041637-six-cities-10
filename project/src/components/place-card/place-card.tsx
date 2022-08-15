import classNames from 'classnames';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus, Favorite } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { changeFavoriteStatus } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import type { Place } from '../../types/place';
import type { FavoriteStatus } from '../../types/favorite-status';
import { getRating } from '../../utils';


type PlaceCardProps = {
  place: Place;
  htmlClasses: {
    imageWrapperClass?: string;
    rootPlaceCardClass?: string;
    placeCardInfoClass?: string;
  };
  onCardFocusChange?: (id: number | null) => void;
};

export const PlaceCard: FC<PlaceCardProps> = (props) => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const { onCardFocusChange, place, htmlClasses } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    rootPlaceCardClass = '',
    imageWrapperClass = '',
    placeCardInfoClass = '',
  } = htmlClasses;

  const rating = getRating(place.rating);

  const handleOnMouseOver = () => {
    onCardFocusChange?.(place.id);
  };

  const handleOnMouseLeave = () => {
    onCardFocusChange?.(null);
  };

  const handleBookmarkButtonClick = (evt: React.MouseEvent<HTMLButtonElement>, placeId: number, favoriteStatus: FavoriteStatus) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(`/${AppRoutes.Login}`);
      return;
    }
    dispatch(changeFavoriteStatus({placeId, status: favoriteStatus}));
  };

  return (
    <article
      className={`${rootPlaceCardClass} place-card`}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(imageWrapperClass, 'place-card__image-wrapper')}
      >
        <img
          className="place-card__image"
          src={place.previewImage}
          width="260"
          height="200"
          alt="Place"
        />
      </div>
      <div className={`${placeCardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': place.isFavorite },
              'button'
            )}
            type="button"
            onClick={(evt) => handleBookmarkButtonClick(evt, place.id, place.isFavorite ? Favorite.False : Favorite.True)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: rating }}></span>
            <span className="visually-hidden">{place.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{place.description}</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
};
