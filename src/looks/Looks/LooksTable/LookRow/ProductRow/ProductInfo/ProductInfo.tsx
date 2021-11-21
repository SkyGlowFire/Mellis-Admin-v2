import LabelSwitch from '~/common/components/form-inputs/LabelSwitch/LabelSwitch';
import { makeStyles } from '@mui/styles';
import { Typography, Theme, Grid } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '~/types/products';

const useStyles = makeStyles<Theme, { enable: boolean }>((theme) => ({
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: ({ enable }) =>
      enable ? theme.palette.success.main : theme.palette.error.main,
  },
  image: {
    width: 80,
  },
}));

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const classes = useStyles({ enable: product.enable });
  return (
    <Grid container spacing={2}>
      <Grid item className={classes.image}>
        <img src={`${product.image.url}`} style={{ width: '100%' }} alt="" />
      </Grid>
      <Grid item>
        <div className={classes.info}>
          <Typography style={{ display: 'inline-block' }}>
            {product.title}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {product._id}
          </Typography>
          <LabelSwitch
            color="success"
            label={product.enable ? 'Enable' : 'Disable'}
            className={classes.label}
            checked={product.enable}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
