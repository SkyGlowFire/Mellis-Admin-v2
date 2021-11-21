import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Collapse,
  Box,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { IOrder, OrderStatus } from '~/types/orders';
import Moment from 'react-moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OrderItem from './OrderItem/OrderItem';
import AddressCard from './AddressCard/AddressCard';
import Select from '~/common/components/form-inputs/Select';
import { useUpdateOrderStatusMutation } from '~/app/api';
import { useAppDispatch } from '~/app/hooks';
import { setAlert } from '~/alerts/alertSlice';

interface OrderRowProps {
  order: IOrder;
}

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'deliver',
  'done',
  'returned',
];

const OrderRow: FC<OrderRowProps> = ({ order }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [updateStatus, { isSuccess }] = useUpdateOrderStatusMutation();
  const dispatch = useAppDispatch();
  const changeStatusHandler = () => {
    updateStatus({ id: order._id, status });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAlert('Order status has been updated', 'success'));
    }
  }, [isSuccess, dispatch]);
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
        <TableCell align="left"></TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderTop: 'none',
            borderBottom: !open ? 'none' : '1px solid #e0e0e0',
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography gutterBottom>Items:</Typography>
              <Grid container spacing={3} style={{ marginBottom: '.5rem' }}>
                {order.items.map((item, idx) => (
                  <Grid item xs={4} lg={3} key={item._id}>
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
              <Grid container>
                <Grid item xs={7}>
                  <AddressCard address={order.address} />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={3}>
                  <Stack direction="column">
                    <Typography variant="subtitle1" gutterBottom>
                      Status:
                    </Typography>
                    <Select
                      value={status}
                      onChange={(val) => setStatus(val)}
                      options={statuses}
                      variant="outlined"
                      style={{ marginBottom: '1rem' }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      disabled={status === order.status}
                      onClick={changeStatusHandler}
                    >
                      Update
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
