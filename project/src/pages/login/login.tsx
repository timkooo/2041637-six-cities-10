import { FormEvent, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoutes, AuthorizationStatus, Cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/application/application.slice';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import { AuthData } from '../../types/auth-data';
import { getRandomLocation } from '../../utils';

export const Login = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomLocation = getRandomLocation();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleOpenLocation = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent> ,city: Cities) => {
    evt.preventDefault();
    navigate(AppRoutes.Main);
    dispatch(changeCity(city));
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
    navigate(AppRoutes.Main);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginRef.current.value)) {
        toast.warn('Login is not valid');
        return;
      }
      if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(passwordRef.current.value)) {
        toast.warn('Password is not valid');
        return;
      }
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return authorizationStatus !== AuthorizationStatus.NoAuth ? (
    <Navigate to={AppRoutes.Main} />
  ) : (
    <div className="page page--gray page--login">
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
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={(evt) => handleOpenLocation(evt, randomLocation)}>
                <span>{randomLocation}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
