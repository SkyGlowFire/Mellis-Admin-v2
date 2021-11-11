import { Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { ICategory } from '~/types/categories';
import BestsellerModal from './BestsellerModal/BestsellerModal';
import BestSellerProduct from './BestSellerProduct/BestSellerProduct';

interface BestSellerProps {
  category: ICategory;
}

const BestSeller: FC<BestSellerProps> = ({ category }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '1rem' }}
        onClick={() => setModalOpen(true)}
      >
        Pick product
      </Button>
      {category.bestseller ? (
        <BestSellerProduct product={category.bestseller} />
      ) : (
        <Typography>
          You can pick one of category products as bestseller
        </Typography>
      )}
      <BestsellerModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
    </>
  );
};

export default BestSeller;
