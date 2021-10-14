import { makeStyles } from '@mui/styles';
import { Typography, Grid, Theme } from '@mui/material';
import { IOrderItem } from '~/types/orders';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    [theme.breakpoints.up('md')]: {
      height: 300,
    },
    [theme.breakpoints.up('lg')]: {
      height: 350,
    },
    border: '1px solid black',
    borderRadius: 10,
  },
  image: {
    backgroundPosition: 'center 20%',
    flex: '1',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px 10px 0 0',
    position: 'relative',
  },
  body: {
    padding: '.5rem',
  },
}));

interface OrderItemProps {
  item: IOrderItem;
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${item.product.image.url})` }}
      />
      <div className={classes.body}>
        <Typography variant="body1" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          size: {item.size}
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" gutterBottom>
              qty: {item.qty}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              ${item.price}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderItem;
