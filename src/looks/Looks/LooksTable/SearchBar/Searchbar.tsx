import { Grid, TextField, InputAdornment } from '@mui/material';
import { FC, Dispatch, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchbarProps {
  setSearchText: Dispatch<SetStateAction<string>>;
  searchText: string;
}

const SearchBar: FC<SearchbarProps> = ({ setSearchText, searchText }) => {
  return (
    <Grid container sx={{ py: '.5rem' }} alignItems="center">
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

export default SearchBar;
