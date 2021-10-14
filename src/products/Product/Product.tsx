import { Grid, Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { NavTab, NavTabs } from '~/common/components/NavTabs/NavTabs';
import { useGetProductQuery } from '~/app/api';
import MainForm from '../components/MainForm/MainForm';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1600,
    paddingTop: '3rem',
  },
}));

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const { data: product } = useGetProductQuery(id);
  const [page, setPage] = useState(0);

  return (
    <>
      <Container className={classes.root} maxWidth={false}>
        <Grid container style={{ marginBottom: '.5rem' }}>
          <Grid item style={{ marginRight: '2rem' }}>
            <Typography variant="h5">{product?.title}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={'/products/new'}
              startIcon={<AddIcon />}
            >
              Add new product
            </Button>
          </Grid>
        </Grid>
        <NavTabs
          style={{ marginBottom: '1rem' }}
          value={page}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, val) => setPage(val)}
        >
          <NavTab label="General" />
          <NavTab label="Related Products" />
        </NavTabs>
      </Container>
      {page === 0 && <MainForm product={product} />}
      {page === 1 && <RelatedProducts />}
    </>
  );
};

export default Product;
