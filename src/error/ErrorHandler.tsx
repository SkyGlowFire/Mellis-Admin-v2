import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { clearUser } from '~/auth/state/authSlice';

const ErrorHandler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error?.status === 401 || error?.status === 403) {
      dispatch(clearUser());
    }
  }, [error]);

  return <>{children}</>;
};

export default ErrorHandler;
