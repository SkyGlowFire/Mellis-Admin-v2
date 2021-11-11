import { FC, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetProductsQuery } from '~/app/api';
import CustomProductsTable, {
  TablePropsMultiple,
} from '~/common/components/CustomProductsTable/CustomProductsTable';
import { useFormContext } from 'react-hook-form';
import { LookFormData } from '../MainForm';
import AddIcon from '@mui/icons-material/Add';

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

interface AddProductsModalProps {
  open: boolean;
  closeHandler: () => void;
}

const AddProductsModal: FC<AddProductsModalProps> = (props) => {
  const classes = useStyles();
  const { open, closeHandler } = props;
  const { watch, setValue, clearErrors } = useFormContext<LookFormData>();
  const items = watch('items');

  const { data: products } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((product) => !items.includes(product._id)),
    }),
  });

  const addItems: TablePropsMultiple['actionHandler'] = useCallback(
    (selected) => {
      setValue('items', items.concat(selected), { shouldDirty: true });
      clearErrors('items');
      closeHandler();
    },
    [items, setValue, clearErrors, closeHandler]
  );

  return (
    <Dialog
      fullWidth
      open={open}
      scroll="body"
      onClose={closeHandler}
      className={classes.root}
      maxWidth="lg"
    >
      <DialogTitle>Add look products</DialogTitle>
      <DialogContent>
        <Container maxWidth={false} className={classes.content}>
          {products && products.length !== 0 ? (
            <CustomProductsTable
              products={products}
              actionText="Add products"
              actionColor="success"
              actionHandler={addItems}
              actionIcon={AddIcon}
              type="multiple"
            />
          ) : (
            <Typography variant="subtitle1" color="secondary">
              No products found
            </Typography>
          )}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductsModal;
