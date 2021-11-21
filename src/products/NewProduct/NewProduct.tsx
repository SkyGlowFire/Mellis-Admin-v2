import { Grid, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useAppDispatch } from '~/app/hooks';
import MainForm from '../components/MainForm/MainForm';
import { clearProduct } from '../state/productSlice';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1600,
    paddingTop: '3rem',
  },
}));

const NewProduct = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearProduct());
  }, [dispatch]);
  return (
    <>
      <Container className={classes.root} maxWidth={false}>
        <Grid container style={{ marginBottom: '.5rem' }}>
          <Grid item style={{ marginRight: '2rem' }}>
            <Typography variant="h5">Add new product</Typography>
          </Grid>
        </Grid>
      </Container>
      <MainForm />
    </>
  );
};

export default NewProduct;
