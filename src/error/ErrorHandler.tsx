import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';

const ErrorHandler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  return <>{children}</>;
};

export default ErrorHandler;
