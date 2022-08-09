import { FC, useEffect, useRef } from 'react';
import { Marker, Icon, LayerGroup } from 'leaflet';
import { Place } from '../../types/place';
import { useMap } from '../../hooks/useMap';

type MapProps = {
  places: Place[];
  currentPlace?: Place;
  selectedPlaceId: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
});

export const Map: FC<MapProps> = ({ places, currentPlace, selectedPlaceId }) => {
  const city = places[0].city;
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  if (currentPlace) {
    places = [...places, currentPlace];
  }

  useEffect(() => {
    if (map) {
      const placesLayer = new LayerGroup();
      placesLayer.addTo(map);

      places.forEach((place) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });

        marker
          .setIcon(
            place.id === selectedPlaceId || place.id === currentPlace?.id ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(placesLayer);
      });
      return () => {
        placesLayer.remove();
      };
    }
  }, [currentPlace, map, places, selectedPlaceId]);

  useEffect(() => {
    if (map) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
        {
          animate: true,
          duration: 0.9,
        }
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      if (currentPlace) {
        map.flyTo(
          [currentPlace.location.latitude, currentPlace.location.longitude],
          14,
          {
            animate: true,
            duration: 0.9,
          }
        );
        return;
      }
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
        {
          animate: true,
          duration: 0.9,
        }
      );
    }
  }, [city, currentPlace, map]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};
