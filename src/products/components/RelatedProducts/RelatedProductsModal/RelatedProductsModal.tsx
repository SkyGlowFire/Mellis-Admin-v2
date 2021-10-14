import { Dialog, DialogContent, DialogTitle, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomProductsTable, {
  CustomProductsTableProps,
} from '~/common/components/CustomProductsTable/CustomProductsTable';
import AddIcon from '@mui/icons-material/Add';
import { SetStateAction, useCallback, Dispatch, useState } from 'react';
import {
  useAddRelatedProductsMutation,
  useGetProductQuery,
  useGetProductsQuery,
} from '~/app/api';
import { useParams } from 'react-router';
import { FC } from 'react';
import { useEffect } from 'react';
import { IProduct } from '~/types/products';

const useStyles = makeStyles({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
  content: {
    maxWidth: 1400,
  },
});

interface RelatedProductsModalProps {
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const RelatedProductsModal: FC<RelatedProductsModalProps> = ({
  open,
  setModalOpen,
}) => {
  const classes = useStyles();
  const [addRelatedProducts] = useAddRelatedProductsMutation();
  const { id } = useParams<{ id: string }>();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { data: currentProduct } = useGetProductQuery(id);
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter((prod) =>
          currentProduct
            ? !currentProduct.relatedProducts.includes(prod._id) &&
              prod._id !== currentProduct._id
            : prod
        )
      );
    }
  }, [currentProduct, products]);

  const actionHandler: CustomProductsTableProps['actionHandler'] = useCallback(
    (selected) => {
      addRelatedProducts({ id, products: selected });
      setModalOpen(false);
    },
    [setModalOpen, addRelatedProducts, id]
  );

  return (
    <Dialog
      fullWidth
      open={open}
      scroll="body"
      onClose={() => setModalOpen(false)}
      className={classes.root}
      maxWidth="lg"
    >
      <DialogTitle>Add related products</DialogTitle>
      <DialogContent>
        <Container maxWidth={false} className={classes.content}>
          <CustomProductsTable
            products={filteredProducts}
            actionText="Link products"
            actionColor="success"
            actionHandler={actionHandler}
            actionIcon={AddIcon}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default RelatedProductsModal;
