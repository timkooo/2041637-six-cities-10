import { Hotel } from './types/hotel';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const getRating = (rating : number) : string => `${rating / 5 * 100}%`;

export const getPlacesByCity = (city: string, places: Hotel[]) => places.filter((place) => place.city.name === city);

export const getDateFromString = (date : string) : string => dayjs(date, 'MMMM YYYY').toString();
