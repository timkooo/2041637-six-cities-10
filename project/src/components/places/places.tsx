import { Hotel } from '../../types/hotel';
import { FC } from 'react';
import { PlaceCard } from '../place-card/place-card';

type PlacesProps = {
  places: Hotel[];
  onCardFocusChange: (id: number | null) => void;
  htmlPlacesClass: {
    class: string
    cardClass: {
      imageWrapperClass?: string,
      rootPlaceCardClass?: string,
      placeCardInfoClass?: string,
    }
  };
};

export const Places: FC<PlacesProps> = ({ places, onCardFocusChange, htmlPlacesClass }) => (
  <div className={`${htmlPlacesClass.class} places__list ${htmlPlacesClass.class === 'cities__place-list' ? 'tabs__content' : ''}`}>
    {places.map((place: Hotel) => (
      <PlaceCard
        onMouseOver={onCardFocusChange}
        onMouseLeave={onCardFocusChange}
        place={place}
        key={place.id}
        htmlClasses={
          htmlPlacesClass.cardClass
        }
      />
    ))}
  </div>
);
