import {
  Grid,
  Typography,
  Button,
  ButtonGroup,
  MenuItem,
  Select,
} from '@mui/material';
import { Dispatch, SetStateAction, FC } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationBarProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  total: number;
}

const PaginationBar: FC<PaginationBarProps> = ({
  setPage,
  itemsPerPage,
  page,
  setItemsPerPage,
  total,
}) => {
  return (
    <Grid container sx={{ padding: '.5rem 0' }} alignItems="center">
      <Grid item xs={3} container alignItems="center" spacing={2}>
        <Grid item>
          <Typography>Page:</Typography>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              <ArrowBackIosIcon sx={{ fontSize: '.7rem' }} />
            </Button>
            <Button disabled style={{ width: 70 }}>
              {page}
            </Button>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={itemsPerPage * page >= total}
            >
              <ArrowForwardIosIcon sx={{ fontSize: '.7rem' }} />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item xs={3} container alignItems="center" spacing={2}>
        <Grid item>
          <Typography>Items per page:</Typography>
        </Grid>
        <Grid item>
          <Select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaginationBar;
