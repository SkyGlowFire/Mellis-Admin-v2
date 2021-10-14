import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useGetOrdersQuery } from '~/app/api';
import OrderRow from './OrderRow/OrderRow';

const OrdersTable = () => {
  const { data: orders } = useGetOrdersQuery();
  return (
    <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
      <Table>
        <TableHead sx={{ padding: '1rem', fontSize: '.7rem' }}>
          <TableRow>
            <TableCell>Order id</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.map((order, idx) => <OrderRow order={order} />)
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No orders</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
