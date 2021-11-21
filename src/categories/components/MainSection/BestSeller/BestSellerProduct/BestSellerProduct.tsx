import { FC } from 'react';
import { IProduct } from '~/types/products';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import LabelSwitch from '~/common/components/form-inputs/LabelSwitch/LabelSwitch';

const useStyles = makeStyles({
  img: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  },
});

interface BestSellerProductProps {
  product: IProduct;
}

const BestSellerProduct: FC<BestSellerProductProps> = ({ product }) => {
  const classes = useStyles();
  return (
    <Grid container sx={{ height: '70%' }}>
      <Grid item xs={12} sm={4}>
        <div
          className={classes.img}
          style={{ backgroundImage: `url(${product.image.url})` }}
        />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ padding: '1rem' }}>
        <Typography gutterBottom variant="h5">
          {product.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Price: ${product.price}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Color: {product.color}
        </Typography>
        <LabelSwitch
          color="success"
          label={product.enable ? 'Enable' : 'Disable'}
          checked={product.enable}
          onClick={(e) => e.preventDefault()}
        />
      </Grid>
    </Grid>
  );
};

export default BestSellerProduct;
