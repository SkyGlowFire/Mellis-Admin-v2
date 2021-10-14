import { Container, Typography } from '@mui/material';
import { FC } from 'react';
import OrdersTable from './OrdersTable/OrdersTable';

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  return (
    <Container
      sx={{ maxWidth: 1600, paddingTop: '2rem', paddingBottom: '2rem' }}
      maxWidth={false}
    >
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <OrdersTable />
    </Container>
  );
};

export default Orders;
