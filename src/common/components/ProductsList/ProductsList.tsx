import { Typography } from '@mui/material';
import { useState, useCallback, useEffect, FC } from 'react';
import { IProduct } from '~/types/products';
import PaginationBar from './PaginationBar/PaginationBar';
import ProductRow from './ProductRow/ProductRow';
import SearchBar from './SearchBar/Searchbar';
import TableToolbar from './TableToolbar/TableToolbar';

interface ProductsListProps {
  products: IProduct[];
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [pageData, setPageData] = useState<IProduct[]>([]);

  useEffect(() => {
    const reg = new RegExp(searchText, 'ig');
    setFilteredData(
      products.filter(
        (product) =>
          reg.test(product.title) ||
          reg.test(product._id) ||
          reg.test(product.sku)
      )
    );
  }, [searchText, products]);

  useEffect(() => {
    setSelected([]);
    setPage(1);
  }, [filteredData]);

  useEffect(() => {
    const startIdx = (page - 1) * itemsPerPage;
    setPageData(filteredData.slice(startIdx, startIdx + itemsPerPage));
  }, [page, itemsPerPage, filteredData]);

  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  const selectHandler = useCallback(
    (val) => () => {
      if (selected.includes(val)) {
        setSelected((prev) => prev.filter((x) => x !== val));
      } else {
        setSelected((prev) => [...prev, val]);
      }
    },
    [selected]
  );

  const selectAllHandler = useCallback(() => {
    if (selected.length !== pageData.length) {
      setSelected(pageData.map((product) => product._id));
    } else {
      setSelected([]);
    }
  }, [selected, pageData]);

  return (
    <div>
      <TableToolbar
        selected={selected}
        products={pageData}
        selectAllHandler={selectAllHandler}
      />
      <SearchBar setSearchText={setSearchText} searchText={searchText} />
      {pageData?.length > 0 ? (
        pageData.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            checked={selected.includes(product._id)}
            selectHandler={selectHandler}
          />
        ))
      ) : (
        <Typography>No products found</Typography>
      )}
      <PaginationBar
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        total={filteredData.length}
      />
    </div>
  );
};

export default ProductsList;
