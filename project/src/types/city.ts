import { Cities } from '../const';

export type City = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  name: Cities,
}
