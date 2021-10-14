import { Button, Typography, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import ProductsList from '~/common/components/ProductsList/ProductsList';
import { useGetProductsQuery } from '~/app/api';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1600,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  table: {
    padding: '1rem',
  },
}));

const Products = () => {
  const classes = useStyles();
  const { data: products } = useGetProductsQuery();
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      <Button
        variant="contained"
        to="/products/new"
        color="primary"
        component={Link}
        style={{ marginBottom: '1rem' }}
      >
        + Add new product
      </Button>
      <Paper className={classes.table}>
        {products && products.length > 0 ? (
          <ProductsList products={products} />
        ) : (
          <Typography>No products</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Products;
