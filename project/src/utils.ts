import { Hotel } from './types/hotel';

export const getRating = (rating : number) : string => `${rating / 5 * 100}%`;

export const getPlacesByCity = (city: string, places: Hotel[]) => places.filter((place) => place.city.name === city);

export const sortPriceLowToHigh = (placeA: Hotel, placeB: Hotel) => {
  if (placeA.price < placeB.price) {
    return -1;
  }
  if (placeA.price > placeB.price) {
    return 1;
  }
  return 0;
};

export const sortPriceHighToLow = (placeA: Hotel, placeB: Hotel) => {
  if (placeA.price > placeB.price) {
    return -1;
  }
  if (placeA.price < placeB.price) {
    return 1;
  }
  return 0;
};

export const sortRating = (placeA: Hotel, placeB: Hotel) => {
  if (placeA.rating > placeB.rating) {
    return -1;
  }
  if (placeA.rating < placeB.rating) {
    return 1;
  }
  return 0;
};

export const formatDateDisplayValue = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long'});

export const formatDateAttribute = (date: string) =>
  new Date(date).toLocaleDateString('en-CA');

