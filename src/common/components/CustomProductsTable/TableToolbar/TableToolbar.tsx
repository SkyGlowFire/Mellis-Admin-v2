import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { IProduct } from '~/types/products';
import { Color } from '../CustomProductsTable';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles<Theme, { actionColor: Color }>((theme) => ({
  root: {
    padding: '.5rem 0',
  },
  actionBtn: {
    backgroundColor: ({ actionColor }) =>
      actionColor
        ? theme.palette[actionColor].main
        : theme.palette.primary.main,
    '&:hover': {
      backgroundColor: ({ actionColor }) =>
        actionColor
          ? theme.palette[actionColor].main
          : theme.palette.primary.main,
    },
    color: theme.palette.primary.contrastText,
  },
}));

interface TableToolbarProps {
  products: IProduct[];
  selectAllHandler: () => void;
  actionHandler: (selected: string[]) => void;
  selected: string[];
  actionText: string;
  actionIcon?: FC;
  actionColor: Color;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const {
    selected,
    selectAllHandler,
    products,
    actionHandler,
    actionText,
    actionIcon,
    actionColor,
  } = props;
  const classes = useStyles({ actionColor });
  const ActionIcon = actionIcon || DeleteIcon;
  return (
    <Grid container className={classes.root} alignItems="center">
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
        {selected.length > 0 && (
          <Button
            variant="contained"
            className={classes.actionBtn}
            startIcon={actionIcon ? <ActionIcon /> : undefined}
            onClick={() => actionHandler(selected)}
          >
            {actionText}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default TableToolbar;
