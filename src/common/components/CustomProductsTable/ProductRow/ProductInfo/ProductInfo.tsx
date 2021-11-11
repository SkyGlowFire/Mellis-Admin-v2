import { makeStyles } from '@mui/styles';
import { Theme, Typography } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '~/types/products';
import LabelSwitch from '~/common/components/form-inputs/LabelSwitch/LabelSwitch';

const useStyles = makeStyles<Theme, { enable: boolean }>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: ({ enable }) =>
      enable ? theme.palette.success.main : theme.palette.secondary.main,
  },
}));

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const classes = useStyles({ enable: product.enable });
  return (
    <div className={classes.root}>
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
        onClick={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default ProductInfo;
