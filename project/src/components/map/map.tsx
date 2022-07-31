import { FC, useEffect, useRef } from 'react';
import { Marker, Icon, LayerGroup } from 'leaflet';
import { Hotel } from '../../types/hotel';
import { useMap } from '../../hooks/useMap';

type MapProps = {
  places: Hotel[];
  selectedPlaceId: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  // iconSize: [40, 40],
  // iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  // iconSize: [40, 40],
  // iconAnchor: [20, 40],
});

export const Map: FC<MapProps> = ({ places, selectedPlaceId }) => {
  const city = places[0].city;
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

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
            place.id === selectedPlaceId ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(placesLayer);
      });
      return () => {
        placesLayer.remove();
      };
    }
  }, [map, places, selectedPlaceId]);

  useEffect(() => {
    if (map) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom, {
        animate: true,
        duration: 0.9
      });
    }
  }, [map, city]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};
