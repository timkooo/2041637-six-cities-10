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
