import { render, screen } from '@testing-library/react';
import { Map } from '../../components/map/map';
import { makeFakePlaces } from '../../utils/mocks';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const fakePlaces = makeFakePlaces();
    const fakeSelectedPlaceId = fakePlaces[0].id;
    render(<Map places={fakePlaces} selectedPlaceId={fakeSelectedPlaceId} />);

    expect(screen.getByTestId('map_component')).toBeInTheDocument();
  });
});
