import { FC, PropsWithChildren, ReactElement} from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/rtkHooks';
import { Login } from '../../pages/login/login';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';

type PrivateRouteProps = {
  children: ReactElement;
};

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = (props) => {
  const { children } = props;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.NoAuth ? <Login /> : children;
};
