import { FC, useMemo } from 'react';
import { useState, useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import ProductsTable, {
  ProductsTableProps,
} from '~/categories/components/ProductsTable/ProductsTable';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICategory } from '~/types/categories';
import {
  useGetCategoryProductsQuery,
  useUnlinkProductsMutation,
} from '~/app/api';
import AddProductsModal from './AddProductsModal/AddProductsModal';

interface ProductsInfoProps {
  selectedCategory: ICategory | null;
}

const ProductsInfo: FC<ProductsInfoProps> = ({ selectedCategory }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [unlinkProducts] = useUnlinkProductsMutation();
  const { data: products } = useGetCategoryProductsQuery(selectedCategory?._id);
  const closeModal = () => {
    setModalOpen(false);
  };

  const tableProps = useMemo<ProductsTableProps>(
    () => ({
      products: products || [],
      fields: [
        { name: 'title', label: 'Name', sortable: true, search: true },
        { name: '_id', label: 'SKU', sortable: true, search: true },
        { name: 'price', label: 'Price' },
      ],
      actionHandler: (selected) => {
        selectedCategory &&
          unlinkProducts({
            categoryId: selectedCategory.id,
            productIds: selected,
          });
      },
      actionIcon: DeleteIcon,
      actionLabel: 'Remove from category',
      actionColor: 'error',
      title: 'Category products',
    }),
    [products, selectedCategory, unlinkProducts]
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '1rem' }}
        onClick={() => setModalOpen(true)}
      >
        Assign products
      </Button>
      <AddProductsModal
        open={modalOpen}
        closeHandler={closeModal}
        selectedCategory={selectedCategory}
      />
      {products && products.length > 0 ? (
        <ProductsTable {...tableProps} />
      ) : (
        <Typography>No products assigned to this category</Typography>
      )}
    </>
  );
};

export default ProductsInfo;
