import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { HistoryRouter } from '../../history-router/history-router';
import { PageNotFound } from './page-not-found';

describe('Component: PageNotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PageNotFound />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
