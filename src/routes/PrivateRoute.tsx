import React, { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Roles = 'admin' | 'customer' | 'editor';

interface PrivateRouteProps {
  component: React.FunctionComponent<any>;
  roles: Roles[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: ChildComponent,
  roles,
  ...rest
}) => {
  const location = useLocation();
  const { isAuth, user, loading } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !loading &&
        (!isAuth || (roles && user && !roles.includes(user.role))) ? (
          <Redirect to={`/auth/login?from=${location.pathname}`} />
        ) : (
          <ChildComponent {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
