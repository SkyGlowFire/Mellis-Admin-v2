import { useForm, FormProvider } from 'react-hook-form';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { makeStyles } from '@mui/styles';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearAuthError, login } from '../state/authSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useLocation, Redirect } from 'react-router-dom';
import {
  TextInputWithIcon,
  PasswordInput,
} from '~/common/components/react-hook-form-inputs';
import { LoginUserDto } from '../state/dto/loginUser.dto';
import Alerts from '~/alerts/Alerts';
import { useRef, useEffect, useLayoutEffect } from 'react';
import { setAlert } from '~/alerts/alertSlice';
import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles({
  root: {
    padding: '2rem 0',
    height: '100vh',
    minHeight: 400,
  },
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuth, error, loading } = useAppSelector((state) => state.auth);
  const classes = useStyles();
  const searchParams = new URLSearchParams(useLocation().search);
  const fromUrl = searchParams.get('from') || '/';
  const firstRender = useRef<boolean>(true);

  useLayoutEffect(() => {
    firstRender.current = false;
    return;
  });

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error, 'error'));
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const onSubmit = (data: LoginUserDto) => {
    dispatch(login(data));
  };

  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  return !firstRender.current && isAuth ? (
    <Redirect to={fromUrl} />
  ) : (
    <>
      <Alerts />
      <FormProvider {...methods}>
        <Container maxWidth="sm" className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography gutterBottom variant="h5" align="center">
              Log In
            </Typography>
            <TextInputWithIcon
              name="email"
              label="Email"
              startIcon={<MailOutlineIcon />}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <PasswordInput
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <Typography
              variant="body2"
              gutterBottom
              style={{ marginBottom: '1rem' }}
            >
              Forgot password?
            </Typography>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className="mb-1"
              loading={loading}
              loadingPosition="start"
            >
              Log in
            </LoadingButton>
          </form>
        </Container>
      </FormProvider>
    </>
  );
};

export default Login;
