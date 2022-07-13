import { FC, PropsWithChildren, ReactElement} from 'react';
import { AuthorizationStatus } from '../../const';
import { Login } from '../../pages/login/login';

type PrivateRouteProps = {
  authorization: AuthorizationStatus;
  children: ReactElement;
};

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = (props) => {
  const { authorization, children } = props;
  return authorization === AuthorizationStatus.Auth ? children : <Login />;
};
