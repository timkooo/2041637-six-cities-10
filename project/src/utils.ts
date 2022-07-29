import { Hotel } from './types/hotel';

const monthToNumber: Record<string, string> = {
  'January' : '01',
  'Fabruary' : '02',
  'March' : '03',
  'April' : '04',
  'May' : '05',
  'June' : '06',
  'July' : '07',
  'August' : '08',
  'September' : '09',
  'October' : '10',
  'November' : '11',
  'December' : '12',
};

export const getRating = (rating : number) : string => `${rating / 5 * 100}%`;

export const getPlacesByCity = (city: string, places: Hotel[]) => places.filter((place) => place.city.name === city);

export const convertDate = (date : string) => {
  const reg = RegExp('^([a-zA-Z]+)\\s+([0-9]+)$');
  const params = reg.exec(date);
  return params ? `${params[2]}-${monthToNumber[params[1]]}` : '';
};

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
