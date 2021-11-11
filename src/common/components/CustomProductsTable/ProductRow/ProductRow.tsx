import { makeStyles } from '@mui/styles';
import { Checkbox, Theme, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '~/types/products';
import ProductInfo from './ProductInfo/ProductInfo';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    padding: '.5rem 0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f6f6f6',
    },
  },
  img: {
    width: 80,
    minWidth: 80,
    marginRight: '1rem',
  },
}));

interface ProductRowProps {
  product: IProduct;
  checked: boolean;
  selectHandler: (id: string) => () => void;
}

const ProductRow: FC<ProductRowProps> = (props) => {
  const { product, checked, selectHandler } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      onClick={selectHandler(product._id)}
    >
      <Grid item>
        <Checkbox checked={checked} />
      </Grid>
      <Grid item className={classes.img}>
        <img src={`${product.image.url}`} style={{ width: '100%' }} alt="" />
      </Grid>
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
