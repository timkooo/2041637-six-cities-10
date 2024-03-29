import { Cities } from './const';
import { Place } from './types/place';

export const getRating = (rating: number): string => `${Math.round(rating) * 20}%`;

export const getPlacesByCity = (city: string, places: Place[]) =>
  places.filter((place) => place.city.name === city);

export const sortPriceLowToHigh = (placeA: Place, placeB: Place) => {
  if (placeA.price < placeB.price) {
    return -1;
  }
  if (placeA.price > placeB.price) {
    return 1;
  }
  return 0;
};

export const sortPriceHighToLow = (placeA: Place, placeB: Place) => {
  if (placeA.price > placeB.price) {
    return -1;
  }
  if (placeA.price < placeB.price) {
    return 1;
  }
  return 0;
};

export const sortRating = (placeA: Place, placeB: Place) => {
  if (placeA.rating > placeB.rating) {
    return -1;
  }
  if (placeA.rating < placeB.rating) {
    return 1;
  }
  return 0;
};

export const formatDateDisplayValue = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

export const formatDateAttribute = (date: string) =>
  new Date(date).toLocaleDateString('en-CA');

export const getRandomLocation = () => {
  const locations = Object.keys(Cities);

  return locations[Math.floor(Math.random() * locations.length)] as Cities;
};
