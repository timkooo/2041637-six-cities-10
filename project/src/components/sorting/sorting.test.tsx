import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace, SortingTypes } from '../../const';
import {
  makeFakePlace,
  makeFakeUserData,
} from '../../utils/mocks';
import { Sorting } from './sorting';

const mockStore = configureMockStore();

describe('Component: PlaceCard', () => {
  it('should render correctly with premium status', async () => {
    const fakePlace = makeFakePlace();
    fakePlace.isPremium = true;
    const store = mockStore({
      [NameSpace.Application]: {
        currentSorting: SortingTypes.Popular,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      },
    });

    render(
      <Provider store={store}>
        <Sorting currentSorting={SortingTypes.Popular} />
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByTestId('sorting_option')[1]);

    const actions = store.getActions();

    expect(actions[0].type).toBe(`${NameSpace.Application}/changeSorting`);

  });
});
