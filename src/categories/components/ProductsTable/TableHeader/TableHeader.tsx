import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChangeEvent, FC } from 'react';
import CustomCheckbox from '~/common/components/form-inputs/CustomCheckbox/CustomCheckbox';
import { Color, IHeadCell, FieldName, Order } from '../ProductsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    '& span': {
      fontSize: '1rem',
    },
  },
}));

interface TableHeaderProps {
  headCells: IHeadCell[];
  handleSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  actionColor: Color;
  rowCount: number;
  handleSort: (fieldname: FieldName) => void;
  order: Order;
  orderBy: FieldName;
}

const TableHeader: FC<TableHeaderProps> = (props) => {
  const {
    handleSelectAll,
    order,
    orderBy,
    numSelected,
    rowCount,
    handleSort,
    headCells,
    actionColor,
  } = props;

  const createSortHandler = (fieldname: FieldName) => () => {
    handleSort(fieldname);
  };

  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell padding="checkbox">
        <CustomCheckbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={handleSelectAll}
          color={actionColor}
        />
      </TableCell>
      {headCells.map((headCell, idx) => (
        <TableCell
          key={headCell.field}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.field ? order : false}
          colSpan={idx === headCells.length - 1 ? 2 : 1}
        >
          {headCell.sortable ? (
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
            >
              {headCell.label}
            </TableSortLabel>
          ) : (
            <span>{headCell.label}</span>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHeader;
