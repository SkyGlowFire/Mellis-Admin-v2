import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Collapse,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { FC, useState } from 'react';
import { IOrder } from '~/types/orders';
import Moment from 'react-moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OrderItem from './OrderItem/OrderItem';
import AddressCard from './AddressCard/AddressCard';

interface OrderRowProps {
  order: IOrder;
}

const OrderRow: FC<OrderRowProps> = ({ order }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <TableRow sx={{ fontSize: '.8rem' }}>
        <TableCell scope="row" component="th" align="left">
          {order._id}
        </TableCell>
        <TableCell>{order.email}</TableCell>

        <TableCell align="left">
          <Moment format="YYYY-MM-DD">{order.createdAt}</Moment>
        </TableCell>
        <TableCell align="left">${order.price}</TableCell>
        <TableCell align="left">{order.status}</TableCell>
        <TableCell align="left">
          <Button variant="outlined" size="small">
            Update
          </Button>
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography gutterBottom>Items:</Typography>
              <Grid container spacing={3} style={{ marginBottom: '.5rem' }}>
                {order.items.map((item) => (
                  <Grid item xs={4} lg={3} xl={2}>
                    <OrderItem item={item} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" gutterBottom>
                Total price: ${order.price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Address:
              </Typography>
              <AddressCard address={order.address} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
