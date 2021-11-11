import { Paper, Typography, Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import CustomProductsTable, {
  TablePropsMultiple,
} from '~/common/components/CustomProductsTable/CustomProductsTable';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';
import {
  useGetRelatedProductsQuery,
  useRemoveRelatedProductsMutation,
} from '~/app/api';
import RelatedProductsModal from './RelatedProductsModal/RelatedProductsModal';
import { FC } from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 1600,
    paddingBottom: '2rem',
  },
  paper: {
    padding: '1.5rem',
    borderRadius: '.5rem',
  },
});

const RelatedProducts: FC = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [removeRelatedProducts] = useRemoveRelatedProductsMutation();
  const { id } = useParams<{ id: string }>();
  const { data: products } = useGetRelatedProductsQuery(id);

  const actionHandler: TablePropsMultiple['actionHandler'] = useCallback(
    (selected) => removeRelatedProducts({ id, products: selected }),
    [id, removeRelatedProducts]
  );

  return (
    <>
      <RelatedProductsModal open={modalOpen} setModalOpen={setModalOpen} />
      <Container className={classes.root} maxWidth={false}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Related products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth={false}
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Assign Products
          </Button>
          <CustomProductsTable
            type="multiple"
            products={products || []}
            actionText="Unlink products"
            actionColor="error"
            actionHandler={actionHandler}
            actionIcon={RemoveIcon}
          />
        </Paper>
      </Container>
    </>
  );
};

export default RelatedProducts;
