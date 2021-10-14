import { Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '~/types/products';
import BulkUpdateBtn from './BulkUpdateButton/BulkUpdateButton';

interface TableToolbarProps {
  selected: string[];
  products: IProduct[];
  selectAllHandler: () => void;
}

const TableToolbar: FC<TableToolbarProps> = ({
  selected,
  selectAllHandler,
  products,
}) => {
  return (
    <Grid container sx={{ py: '.5rem' }} alignItems="center">
      <Grid item style={{ marginRight: '1rem' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={
                products.length !== 0 && selected.length === products.length
              }
              onChange={selectAllHandler}
              color="primary"
              indeterminate={
                selected.length !== 0 && selected.length < products.length
              }
            />
          }
          label="Select all"
        />
      </Grid>
      <Grid item style={{ marginRight: '1rem' }}>
        <Typography>Selected: {selected.length} items</Typography>
      </Grid>
      <Grid item>
        {selected.length > 0 && <BulkUpdateBtn selected={selected} />}
      </Grid>
    </Grid>
  );
};

export default TableToolbar;
