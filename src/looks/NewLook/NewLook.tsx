import { Container, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '~/app/hooks';
import MainForm from '../components/MainForm/MainForm';
import { clearImage } from '../state/lookSlice';

interface NewLookProps {}

const NewLook: FC<NewLookProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearImage());
  }, []);
  return (
    <Container sx={{ maxWidth: 1600, paddingTop: '3rem' }} maxWidth={false}>
      <Typography variant="h5" gutterBottom>
        Add new look
      </Typography>
      <MainForm />
    </Container>
  );
};

export default NewLook;
