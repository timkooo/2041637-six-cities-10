import { datatype, internet, lorem, name } from 'faker';
import { Cities } from '../const';

export const makeFakeComment = () => ({
  comment: lorem.text(),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeComments = () =>
  new Array(5).fill(null).map(() => makeFakeComment());

export const makeFakePlace = () => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    },
    name: Cities.Amsterdam,
  },
  description: lorem.text(),
  goods: new Array(5).fill(null).map((good, index) => lorem.word() + index),
  host: {
    avatarUrl: internet.url(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: new Array(5).fill(null).map(() => internet.url()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: internet.url(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: datatype.string(),
});

export const makeFakePlaces = () =>
  new Array(5).fill(null).map(() => makeFakePlace());

export const makeFakeUserData = () => ({
  avatarUrl: internet.url(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: datatype.string(),
  token: datatype.string(),
});

export const makeFakeCity = () => ({
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  name: Cities.Amsterdam,
});
