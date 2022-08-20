import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  AuthorizationStatus,
  Cities,
  NameSpace,
  SortingTypes,
} from '../../const';
import { makeFakeComments, makeFakePlaces } from '../../utils/mocks';
import CommentsForm from './comments-form';

const mockStore = configureMockStore();

describe('Component: ComponentsForm', () => {
  it('should render correctly', async () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const store = mockStore({
      [NameSpace.Application]: {
        currentCity: Cities.Paris,
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.Comments]: {
        areCommentsLoaded: true,
        comments: makeFakeComments(),
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
        <CommentsForm id={'1'} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')
    ).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('textarea'), 'How much is the fish?');

    expect(screen.getByDisplayValue('How much is the fish?')).toBeInTheDocument();
  });
});
