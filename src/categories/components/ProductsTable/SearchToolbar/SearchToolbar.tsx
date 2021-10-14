import { TableCell, TableRow, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { IFilters, TableField } from '../ProductsTable';

interface SearchToolbarProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  fields: TableField[];
}

const SearchToolbar: FC<SearchToolbarProps> = (props) => {
  const { filters, setFilters, fields } = props;

  const filterChange =
    (name: keyof IFilters) => (e: ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [name]: e.target.value }));
    };

  return (
    <TableRow tabIndex={-1}>
      <TableCell align="left" key={fields[0].name + '_search'} colSpan={2}>
        {fields[0].search ? (
          <TextField
            variant="outlined"
            size="small"
            onChange={filterChange(fields[0].name)}
            value={filters[fields[0].name]}
            placeholder={fields[0].label}
          />
        ) : (
          <></>
        )}
      </TableCell>
      {fields.slice(1).map((field, idx) => (
        <TableCell
          align="left"
          key={field.name + '_search'}
          colSpan={idx === fields.length - 2 ? 2 : 1}
        >
          {field.search ? (
            <TextField
              variant="outlined"
              size="small"
              onChange={filterChange(field.name)}
              value={filters[field.name]}
              placeholder={field.label}
            />
          ) : (
            <></>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SearchToolbar;
