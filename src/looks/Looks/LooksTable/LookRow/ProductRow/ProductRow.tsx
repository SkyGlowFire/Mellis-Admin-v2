import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '~/types/products';
import ProductInfo from './ProductInfo/ProductInfo';

interface ProductRowProps {
  product: IProduct;
}

const ProductRow: FC<ProductRowProps> = ({ product }) => {
  return (
    <Grid container sx={{ padding: '.5rem 0' }} alignItems="center">
      <Grid item xs>
        <ProductInfo product={product} />
      </Grid>
      <Grid item xs>
        <Typography
          variant="subtitle1"
          color={product.category ? 'textPrimary' : 'textSecondary'}
        >
          {product.pathString}
        </Typography>
      </Grid>
      <Grid item style={{ marginRight: '1rem' }} xs={1}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          ${product.price}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProductRow;
