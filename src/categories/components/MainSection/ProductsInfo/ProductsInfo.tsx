import { FC, useMemo } from 'react';
import { useState, useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import ProductsTable, {
  ProductsTableProps,
} from '~/categories/components/ProductsTable/ProductsTable';
import { ICategory } from '~/types/categories';
import {
  useGetCategoryProductsQuery,
  useUnlinkProductsMutation,
} from '~/app/api';
import AddProductsModal from './AddProductsModal/AddProductsModal';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface ProductsInfoProps {
  category: ICategory;
}

const ProductsInfo: FC<ProductsInfoProps> = ({ category }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [unlinkProducts] = useUnlinkProductsMutation();
  const { data: products } = useGetCategoryProductsQuery(category._id);
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
        unlinkProducts({
          categoryId: category.id,
          productIds: selected,
        });
      },
      actionIcon: CancelOutlinedIcon,
      actionLabel: 'Remove from category',
      actionColor: 'error',
      title: 'Category products',
    }),
    [products, category, unlinkProducts]
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
        category={category}
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
