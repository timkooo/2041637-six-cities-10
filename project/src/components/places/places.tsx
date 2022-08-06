import { Place } from '../../types/hotel';
import { FC } from 'react';
import { PlaceCard } from '../place-card/place-card';
import classNames from 'classnames';

type PlacesProps = {
  places: Place[];
  onCardFocusChange: (id: number | null) => void;
  htmlPlacesClass: {
    class: string;
    cardClass: {
      imageWrapperClass?: string;
      rootPlaceCardClass?: string;
      placeCardInfoClass?: string;
    };
  };
};

export const Places: FC<PlacesProps> = ({
  places,
  onCardFocusChange,
  htmlPlacesClass,
}) => (
  <div
    className={classNames(htmlPlacesClass.class, 'places__list', {
      tabs__content: htmlPlacesClass.class === 'cities__places-list',
    })}
  >
    {places.map((place: Place) => (
      <PlaceCard
        onCardFocusChange={onCardFocusChange}
        place={place}
        key={place.id}
        htmlClasses={htmlPlacesClass.cardClass}
      />
    ))}
  </div>
);
