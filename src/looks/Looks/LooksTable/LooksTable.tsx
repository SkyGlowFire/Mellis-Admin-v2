import { Typography } from '@mui/material';
import { useState, useCallback, useEffect, FC } from 'react';
import { IPopulatedLook } from '~/types/looks';
import PaginationBar from './PaginationBar/PaginationBar';
import LookRow from './LookRow/LookRow';
import SearchBar from './SearchBar/Searchbar';
import TableToolbar from './TableToolbar/TableToolbar';

interface LooksTableProps {
  looks: IPopulatedLook[];
}

const LooksTable: FC<LooksTableProps> = ({ looks }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [filteredData, setFilteredData] = useState<IPopulatedLook[]>([]);
  const [pageData, setPageData] = useState<IPopulatedLook[]>([]);

  useEffect(() => {
    const reg = new RegExp(searchText, 'ig');
    setFilteredData(looks.filter((look) => reg.test(look._id)));
  }, [searchText, looks]);

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
      setSelected(pageData.map((look) => look._id));
    } else {
      setSelected([]);
    }
  }, [selected, pageData]);

  return (
    <div>
      <TableToolbar
        selected={selected}
        looks={pageData}
        selectAllHandler={selectAllHandler}
      />
      <SearchBar setSearchText={setSearchText} searchText={searchText} />
      {pageData?.length > 0 ? (
        pageData.map((look) => (
          <LookRow
            key={look._id}
            look={look}
            checked={selected.includes(look._id)}
            selectHandler={selectHandler}
          />
        ))
      ) : (
        <Typography>No looks found</Typography>
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

export default LooksTable;
