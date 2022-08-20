import { Link } from 'react-router-dom';

export const PageNotFound = () => (
  <section className="not-found__screen">
    <h1>404. Page not found</h1>
    <Link to="/">Вернуться на главную</Link>
  </section>
);
