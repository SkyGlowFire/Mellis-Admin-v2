import { FC } from 'react';
import { Alert, Stack, AlertTitle, Typography } from '@mui/material';
import { selectAlerts, removeAlert } from './alertSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 80,
    width: '100%',
    zIndex: 100,
  },
}));

const Alerts: FC = () => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);
  const classes = useStyles();

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
