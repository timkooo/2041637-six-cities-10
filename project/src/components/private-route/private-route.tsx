import { FC, PropsWithChildren, ReactElement} from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/rtkHooks';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';

type PrivateRouteProps = {
  children: ReactElement;
};

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = (props) => {
  const { children } = props;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.NoAuth ? <Navigate to={`/${AppRoutes.Login}`} /> : children;
};
