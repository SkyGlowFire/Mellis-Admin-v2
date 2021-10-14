import { useCallback, FC } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ProductsTable, {
  ProductsTableProps,
} from '~/categories/components/ProductsTable/ProductsTable';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import { ICategory } from '~/types/categories';
import { useGetProductsQuery, useLinkProductsMutation } from '~/app/api';

const useStyles = makeStyles(() => ({
  root: {
    width: '80%',
    margin: '0 auto',
    maxWidth: 1600,
    minHeight: 450,
  },
  content: {},
}));

interface AddProductsModalInterface {
  open: boolean;
  closeHandler: () => void;
  selectedCategory: ICategory | null;
}

const AddProductsModal: FC<AddProductsModalInterface> = ({
  open,
  closeHandler,
  selectedCategory,
}) => {
  const { data: products } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data
        ? data.filter((x) => x.category !== selectedCategory?.id)
        : null,
    }),
  });

  const [linkProducts] = useLinkProductsMutation();

  const classes = useStyles();

  const tableProps: ProductsTableProps = {
    products: products || [],
    fields: [
      { name: 'title', label: 'Name', sortable: true, search: true },
      { name: '_id', label: 'SKU', sortable: true, search: true },
      { name: 'pathString', label: 'Category', search: true },
      {
        name: 'price',
        label: 'Price',
        sortable: true,
        search: false,
        transform: (val) => `$${val}`,
      },
    ],
    actionHandler: useCallback(
      (selected) => {
        selectedCategory &&
          linkProducts({
            categoryId: selectedCategory.id,
            productIds: selected,
          });
        closeHandler();
      },
      [selectedCategory, linkProducts, closeHandler]
    ),
    actionIcon: AddIcon,
    actionLabel: 'Add to category',
    actionColor: 'success',
    title: 'All products',
  };

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      className={classes.root}
      maxWidth={false}
      fullWidth
    >
      <DialogTitle>
        Add products to {selectedCategory && selectedCategory.path.join('/')}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ProductsTable {...tableProps} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductsModal;
