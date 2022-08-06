import { Place } from './types/hotel';

export const getRating = (rating: number): string => `${(rating / 5) * 100}%`;

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
