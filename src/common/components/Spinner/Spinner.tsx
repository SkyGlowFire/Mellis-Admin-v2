import { FC } from 'react';
import styles from './Spinner.module.scss';
import { useAppSelector } from '../../../app/hooks';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner: FC = () => {
  const { loading } = useAppSelector((state) => state.main);
  return (
    <>
      {loading && (
        <div className={styles.layout}>
          <CircularProgress size={60} sx={{ marginTop: 30 }} />
        </div>
      )}
    </>
  );
};

export default Spinner;
