import { Hotel } from './types/hotel';

export enum AppRoutes {
  Main = '/',
  Login = 'login',
  Favorites = 'favorites',
  Room = 'offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const htmlClasses = {
  cities : {
    class: 'cities__places-list',
    cardClass: {
      imageWrapperClass: 'cities__image-wrapper',
      rootPlaceCardClass: 'cities__card',
    }
  },
  near : {
    class: 'near-places__list',
    cardClass: {
      imageWrapperClass: 'near-places__image-wrapper',
      rootPlaceCardClass: 'near-places__card',
    }
  }
};

export enum SortingTypes {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

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

export const sortingToFunction = {
  [SortingTypes.Popular] : () => 0,
  [SortingTypes.PriceLowToHigh] : sortPriceLowToHigh ,
  [SortingTypes.PriceHighToLow] : sortPriceHighToLow,
  [SortingTypes.TopRated] : sortRating,
};
