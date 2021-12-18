import React, { FC, useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { setAlert } from '~/alerts/alertSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Spinner from '~/common/components/Spinner/Spinner';
import { getUser } from '~/auth/state/authSlice';

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
  const [permitted, setPermitted] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!isAuth) {
      // dispatch(setAlert('Not authorized', 'error'));
      setPermitted(false);
    } else if (roles && user && !roles.includes(user.role)) {
      dispatch(setAlert('You are not permitted to acces this paged', 'error'));
      setPermitted(false);
    }
  }, [roles, isAuth, user, loading, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : !permitted ? (
          <Redirect to={`/auth/login?from=${location.pathname}`} />
        ) : (
          <ChildComponent {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
