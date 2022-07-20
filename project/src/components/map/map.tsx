import { FC, useEffect, useRef } from 'react';
import { Marker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotel } from '../../types/hotel';
import { useMap } from '../../hooks/useMap';
import { City } from '../../types/city';

type MapProps = {
  city: City;
  places: Hotel[];
  selectedPlace: number | null;
};

export const Map: FC<MapProps> = ({ city, places, selectedPlace }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl:
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      places.forEach((place) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });

        marker.setIcon(place.id === selectedPlace ? currentCustomIcon : defaultCustomIcon).addTo(map);
      });
    }
  }, [map, places, selectedPlace]);

  return <div style={{ height: '980px' }} ref={mapRef}></div>;
};
