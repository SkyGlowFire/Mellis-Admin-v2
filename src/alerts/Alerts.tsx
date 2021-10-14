import { FC, useEffect } from 'react';
import { Alert, Stack, AlertTitle, Typography } from '@mui/material';
import { selectAlerts, removeAlert, setAlert } from './alertSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 60,
    width: '100%',
    zIndex: 100,
  },
}));

const Alerts: FC = () => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);
  const { error } = useAppSelector((state) => state.main);
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error.message, 'error'));
    }
  }, [error, dispatch]);

  return (
    <div className={classes.root}>
      <Stack
        sx={{ margin: 'auto', width: '60%', maxWidth: '700px' }}
        spacing={2}
      >
        {alerts.map((alert) => (
          <Alert
            severity={alert.type}
            key={alert.id}
            onClose={() => {
              dispatch(removeAlert(alert.id));
            }}
          >
            <AlertTitle>{alert.type.toUpperCase()}</AlertTitle>
            {typeof alert.message === 'string' ? (
              <Typography>{alert.message}</Typography>
            ) : (
              <>
                {alert.message.map((msg) => (
                  <Typography key={`alert-${msg}`}>{msg}</Typography>
                ))}
              </>
            )}
          </Alert>
        ))}
      </Stack>
    </div>
  );
};

export default Alerts;
