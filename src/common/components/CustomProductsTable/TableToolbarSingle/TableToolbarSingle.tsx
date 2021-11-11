import { Button, Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
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
  actionHandler: (selected: string) => void;
  selected: string | undefined;
  actionText: string;
  actionIcon?: FC;
  actionColor: Color;
}

const TableToolbarSingle: FC<TableToolbarProps> = (props) => {
  const { selected, actionHandler, actionText, actionIcon, actionColor } =
    props;
  const classes = useStyles({ actionColor });
  const ActionIcon = actionIcon || DeleteIcon;
  return (
    <Box sx={{ padding: '.5rem 0' }} alignItems="center">
      {selected && (
        <Button
          variant="contained"
          className={classes.actionBtn}
          startIcon={actionIcon ? <ActionIcon /> : undefined}
          onClick={() => actionHandler(selected)}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default TableToolbarSingle;
