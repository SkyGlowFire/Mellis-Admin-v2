import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  MouseEvent,
  useCallback,
} from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@mui/material';
import { IProduct } from '~/types/products';
import TableToolbar from './TableToolbar/TableToolbar';
import SearchToolbar from './SearchToolbar/SearchToolbar';
import TableHeader from './TableHeader/TableHeader';
import CustomCheckbox from '~/common/components/form-inputs/CustomCheckbox/CustomCheckbox';

const useStyles = makeStyles<Theme, { actionColor: Color }>((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    minHeight: 250,
  },
  tableRow: {
    '&  button': {
      opacity: 0,
      transition: 'opacity .2s ease-in-out',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: ({ actionColor }) =>
        actionColor === 'success'
          ? theme.palette.success.light
          : theme.palette.error.light,
    },
    '&:hover': {
      '& button': {
        opacity: 1,
      },
    },
    cursor: 'pointer',
  },
}));

export type Color = 'success' | 'error';

export type Order = 'asc' | 'desc';

export type FieldName =
  | 'title'
  | 'price'
  | '_id'
  | 'color'
  | 'sku'
  | 'pathString';

export type ProductFields = Pick<IProduct, FieldName>;

export type IFilters = { [key in FieldName]?: string };

export interface TableField {
  name: FieldName;
  label: string;
  sortable?: boolean;
  search?: boolean;
  transform?: (val: any) => string | number;
}

export interface IHeadCell extends Omit<TableField, 'name'> {
  field: FieldName;
  disablePadding: boolean;
  numeric: boolean;
}

export interface ProductsTableProps {
  fields: TableField[];
  products: IProduct[];
  actionHandler: (selcted: string[]) => void;
  actionIcon: FC;
  actionColor: Color;
  actionLabel: string;
  title: string;
}

const ProductsTable: FC<ProductsTableProps> = (props) => {
  const {
    products,
    fields,
    actionHandler,
    actionIcon,
    actionColor,
    actionLabel,
    title,
  } = props;
  const classes = useStyles({ actionColor });
  const [filters, setFilters] = useState<IFilters>({
    title: '',
    sku: '',
  });
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<FieldName>('title');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [data, setData] = useState<IProduct[]>(products);
  const [selected, setSelected] = useState<string[]>([]);

  const headCells = formHeadCells(fields);

  useEffect(() => {
    let newData = filterData(products, filters);
    setData(newData);
    setSelected((prev) =>
      prev.filter((id) => newData.some((product) => product._id === id))
    );
  }, [products, filters]);

  const handleSort = (fieldname: FieldName): void => {
    const isAsc = orderBy === fieldname && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(fieldname);
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? data.map((product) => product._id) : []);
  };

  const handleSelect =
    (id: string) => (event: MouseEvent<HTMLTableRowElement>) => {
      event.stopPropagation();
      if (selected.includes(id)) {
        setSelected((prev) => prev.filter((x) => x !== id));
      } else {
        setSelected((prev) => [...prev, id]);
      }
    };

  const handleChangePage = (_: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.includes(id);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.length - page * rowsPerPage);

  const linkBtnHandler = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const win = window.open(`/product/${id}`, '_blank');
    win && win.focus();
  };

  const actionBtnHandler = useCallback(() => {
    if (actionHandler) {
      actionHandler(selected);
    } else {
      console.log(selected);
    }
    setSelected([]);
  }, [actionHandler, selected]);

  return (
    <>
      {products && data && (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableToolbar
              actionHandler={actionBtnHandler}
              selected={selected}
              actionIcon={actionIcon}
              actionColor={actionColor}
              actionLabel={actionLabel}
              title={title}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <TableHead>
                  <SearchToolbar
                    fields={fields}
                    setFilters={setFilters}
                    filters={filters}
                  />
                  <TableHeader
                    headCells={headCells}
                    actionColor={actionColor}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    handleSelectAll={handleSelectAll}
                    handleSort={handleSort}
                    rowCount={data?.length}
                  />
                </TableHead>

                <TableBody>
                  {sortData(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={handleSelect(row._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                          classes={{ selected: classes.selected }}
                          className={classes.tableRow}
                        >
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              color={actionColor}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {row[fields[0].name]}
                          </TableCell>
                          {fields.slice(1).map((field) => (
                            <TableCell align="left" key={row[field.name]}>
                              {field.transform
                                ? field.transform(row[field.name])
                                : row[field.name]}
                            </TableCell>
                          ))}
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={linkBtnHandler(row._id)}
                              color="primary"
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 40 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component={'div'}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </>
  );
};

export default ProductsTable;

function formHeadCells(fields: TableField[]): IHeadCell[] {
  let headCells = [
    {
      field: fields[0].name,
      numeric: false,
      disablePadding: true,
      label: fields[0].label,
      sortable: fields[0].sortable || false,
      search: fields[0].search || false,
    },
  ];
  headCells = headCells.concat(
    fields.slice(1).map((field) => ({
      field: field.name,
      numeric: false,
      disablePadding: false,
      label: field.label,
      sortable: field.sortable || false,
      search: field.search || false,
    }))
  );
  return headCells;
}

function testItem(item: IProduct, filters: IFilters): boolean {
  const keys = Object.keys(filters) as Array<FieldName>;
  return keys.every((key) => {
    return !filters[key] || filters[key] === ''
      ? true
      : new RegExp(filters[key] as string, 'i').test(item[key] as string);
  });
}

function filterData(data: IProduct[], filters: IFilters): IProduct[] {
  return data.filter((item) => testItem(item, filters));
}

function sortData(data: IProduct[], comparator: Comparator): IProduct[] {
  const helperArray: [IProduct, number][] = data.map((el, index) => [
    el,
    index,
  ]);
  //first sort by fields, if values are equal, sort by idx.
  helperArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return helperArray.map((el) => el[0]);
}

type Comparator = (a: IProduct, b: IProduct) => number;

function getComparator(order: Order, orderBy: FieldName): Comparator {
  return order === 'desc'
    ? (a: IProduct, b: IProduct) => descendingComparator(a, b, orderBy)
    : (a: IProduct, b: IProduct) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(
  product1: IProduct,
  product2: IProduct,
  orderBy: FieldName
): -1 | 1 | 0 {
  if (product1[orderBy] < product2[orderBy]) {
    return -1;
  } else if (product1[orderBy] > product2[orderBy]) {
    return 1;
  } else {
    return 0;
  }
}
