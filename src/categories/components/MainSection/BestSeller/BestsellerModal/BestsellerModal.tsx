import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomProductsTable, {
  TablePropsSingle,
} from '~/common/components/CustomProductsTable/CustomProductsTable';
import { SetStateAction, useCallback, Dispatch } from 'react';
import {
  useSelectBestsellerMutation,
  useGetCategorySubProductsQuery,
} from '~/app/api';
import { FC } from 'react';
import { ICategory } from '~/types/categories';

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

interface BestsellerModalProps {
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  category: ICategory;
}

const BestsellerModal: FC<BestsellerModalProps> = ({
  open,
  setModalOpen,
  category,
}) => {
  const classes = useStyles();
  const { data } = useGetCategorySubProductsQuery({
    categoryName: category.path[0],
    groupName: category.path[1],
  });
  const [selectBestseller] = useSelectBestsellerMutation();

  const actionHandler: TablePropsSingle['actionHandler'] = useCallback(
    (selected) => {
      selectBestseller({
        categoryId: category._id,
        productId: selected,
      });
      setModalOpen(false);
    },
    [setModalOpen, category]
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
      <DialogTitle>Pick bestseller product</DialogTitle>
      <DialogContent>
        <Container maxWidth={false} className={classes.content}>
          {data?.products && data?.products.length > 0 ? (
            <CustomProductsTable
              products={data?.products || []}
              actionText="Select product"
              actionColor="success"
              actionHandler={actionHandler}
              type="single"
            />
          ) : (
            <Typography>No products assigned to this category</Typography>
          )}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default BestsellerModal;
