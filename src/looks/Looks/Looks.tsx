import { Button, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetLooksQuery } from '~/app/api';
import LooksTable from './LooksTable/LooksTable';

interface LooksProps {}

const Looks: FC<LooksProps> = () => {
  const { data: looks } = useGetLooksQuery();
  return (
    <Container sx={{ maxWidth: 1600, py: '2rem' }} maxWidth={false}>
      <Typography variant="h5" gutterBottom>
        Looks
      </Typography>
      <Button
        variant="contained"
        to="/looks/new"
        color="primary"
        component={Link}
        style={{ marginBottom: '1rem' }}
      >
        + Add new outfit
      </Button>
      <Paper sx={{ padding: '1rem' }}>
        {looks && looks.length !== 0 ? (
          <LooksTable looks={looks} />
        ) : (
          <Typography>No outfits</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Looks;
