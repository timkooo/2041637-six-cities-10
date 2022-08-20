import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {
  AuthorizationStatus,
  NameSpace,
} from '../../const';
import { HistoryRouter } from '../../history-router/history-router';
import { makeFakePlaces } from '../../utils/mocks';
import { Places } from './places';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Places', () => {
  it('should render correctly', async () => {
    const places = makeFakePlaces();
    const currentPlace = places[0];
    const store = mockStore({
      [NameSpace.Places]: {
        arePlacesLoaded: true,
        places: places,
        isCurrentPlaceLoaded: true,
        areNearestPlacesLoaded: true,
        currentPlace: currentPlace,
        nearestPlaces: places,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Places
            places={places}
            onCardFocusChange={jest.fn()}
            htmlPlacesClass={{ class: 'class', cardClass: {} }}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('place_card').length).toBe(places.length);
  });
});
