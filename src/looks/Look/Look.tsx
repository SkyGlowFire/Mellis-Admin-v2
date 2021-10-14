import { Container, Button } from '@mui/material';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useGetLookQuery } from '~/app/api';
import MainForm from '~/looks/components/MainForm/MainForm';

const Look = () => {
  const { id } = useParams<{ id: string }>();
  const { data: look } = useGetLookQuery(id);

  return (
    <Container sx={{ maxWidth: 1600, paddingTop: '3rem' }} maxWidth={false}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={'/looks/new'}
        sx={{ marginBottom: '1rem' }}
        startIcon={<AddIcon />}
      >
        Add new look
      </Button>
      <MainForm look={look} />
    </Container>
  );
};

export default Look;
