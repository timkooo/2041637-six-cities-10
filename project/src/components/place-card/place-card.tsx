import classNames from 'classnames';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Hotel } from '../../types/hotel';
import { getRating } from '../../utils';

type PlaceCardProps = {
  place: Hotel;
  htmlClasses: {
    imageWrapperClass?: string;
    rootPlaceCardClass?: string;
    placeCardInfoClass?: string;
  }
  onCardFocusChange?: (id: number | null) => void;
};

export const PlaceCard: FC<PlaceCardProps> = (props) => {
  const navigate = useNavigate();

  const {
    onCardFocusChange,
    place,
    htmlClasses,
  } = props;

  const {
    rootPlaceCardClass = '',
    imageWrapperClass = '',
    placeCardInfoClass = ''
  } = htmlClasses;

  const rating = getRating(place.rating);

  const handleOnMouseOver = () => {
    onCardFocusChange?.(place.id);
  };

  const handleOnMouseLeave = () => {
    onCardFocusChange?.(null);
  };

  const handleMouseClick = () => {
    navigate(`./offer/${place.id}`);
  };

  return (
    <article className={`${rootPlaceCardClass} place-card`} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave} onClick={handleMouseClick}>
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={classNames(imageWrapperClass, 'place-card__image-wrapper')}>
        <a href="#">
          <img
            className="place-card__image"
            src={place.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${placeCardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{place.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', {'place-card__bookmark-button--active' : place.isFavorite}, 'button')} type="button">
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
          <Link to={`./offer/${place.id}`}>{place.description}</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
};
