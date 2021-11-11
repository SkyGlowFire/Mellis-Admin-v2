import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    fontSize: '3rem',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

const Spinner: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={60} />
    </div>
  );
};

export default Spinner;
