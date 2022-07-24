import { Hotel } from './types/hotel';

export const getRating = (rating : number) : string => `${rating / 5 * 100}%`;

export const getPlacesByCity = (city: string, places: Hotel[]) => places.filter((place) => place.city.name === city);
