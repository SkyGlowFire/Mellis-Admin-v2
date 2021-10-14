import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from './common/components/Spinner/Spinner';
import PrivateRoute from './routes/PrivateRoute';
import Login from './auth/Login/Login';
import Routes from './routes/Routes';
import { useAppDispatch } from './app/hooks';
import { getUser } from './auth/state/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div>
      <Spinner />
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <PrivateRoute component={Routes} roles={['admin', 'editor']} />
      </Switch>
    </div>
  );
}

export default App;
