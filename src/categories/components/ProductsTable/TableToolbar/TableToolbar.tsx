import { makeStyles } from '@mui/styles';
import { Theme, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { Color } from '../ProductsTable';
import { FC } from 'react';
import clsx from 'clsx';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const useStyles = makeStyles<Theme, { color: Color }>((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    backgroundColor: ({ color }) => {
      switch (color) {
        case 'success':
          return theme.palette.success.light;
        case 'error':
          return theme.palette.error.light;
        default:
          return theme.palette.success.light;
      }
    },
  },
  title: {
    flex: '1 1 100%',
  },
  searchBar: {
    display: 'flex',
    '& > *': {
      marginRight: '1rem',
    },
  },
}));

interface TableToolbarProps {
  actionHandler: () => void;
  selected: string[];
  actionLabel: string;
  title: string;
  actionIcon: FC;
  actionColor: Color;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const {
    selected,
    actionLabel,
    title,
    actionHandler,
    actionIcon,
    actionColor,
  } = props;
  const classes = useStyles({ color: actionColor });
  const ActionIcon = actionIcon || CancelOutlinedIcon;

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: selected.length > 0,
        })}
      >
        {selected.length > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title || 'Products'}
          </Typography>
        )}

        {selected.length > 0 && (
          <Tooltip title={actionLabel || 'Delete'}>
            <IconButton onClick={actionHandler} sx={{ color: 'black' }}>
              <ActionIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
};

export default TableToolbar;
