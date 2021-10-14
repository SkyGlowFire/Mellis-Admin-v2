import { Grid, InputAdornment, TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface TableSearchbarProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const TableSearchbar: FC<TableSearchbarProps> = ({
  setSearchText,
  searchText,
}) => {
  return (
    <Grid container sx={{ padding: '.5rem 0' }} alignItems="center">
      <Grid item style={{ marginRight: '1rem' }}>
        <TextField
          placeholder="Product Name, SKU"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            inputProps: { style: { paddingLeft: '.5rem' } },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TableSearchbar;
