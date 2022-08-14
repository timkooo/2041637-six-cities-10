import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { logoutAction } from '../../store/api-actions';
import { selectFavoritesNumber } from '../../store/favorites/favorites.selectors';
import {
  selectAuthorizationStatus,
  selectUserData,
} from '../../store/user/user.selectors';

export const Header = memo(() => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const favoritesNumber = useAppSelector(selectFavoritesNumber);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoutes.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {authorizationStatus === AuthorizationStatus.NoAuth && !userData ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={`/${AppRoutes.Login}`}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Log In</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    to={`/${AppRoutes.Favorites}`}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={userData?.avatarUrl} alt="User Avatar" />
                    </div>
                    <span className="header__user-name user__name">
                      {userData?.email}
                    </span>
                    <span className="header__favorite-count">
                      {favoritesNumber}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <span
                    className="header__signout"
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogoutClick}
                  >
                    Log Out
                  </span>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
