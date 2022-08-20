import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  AuthorizationStatus,
  Cities,
  NameSpace,
  SortingTypes,
} from '../../const';
import { makeFakeComments, makeFakePlaces } from '../../utils/mocks';
import { CommentsList } from './comments-list';


const mockStore = configureMockStore();

describe('Component: ComponentsForm', () => {
  it('should render correctly', async () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const comments = makeFakeComments();
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: comments,
      },
      [NameSpace.Places]: {
        arePlacesLoaded: true,
        places: places,
        isCurrentPlaceLoaded: true,
        areNearestPlacesLoaded: true,
        currentPlace: currentPlace,
        nearestPlaces: places,
      },
      [NameSpace.Favorites]: {
        areFavoritesLoaded: true,
        favorites: places,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    );

    expect(screen.getAllByTestId('review_item').length).toBe(comments.length);
  });
});
