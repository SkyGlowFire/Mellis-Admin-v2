import { MenuItem, MenuItemProps } from '@mui/material';
import { withStyles } from '@mui/styles';
import { FC } from 'react';

const RedMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const PrimaryMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface CustomMenuItemProps extends MenuItemProps {
  color: 'primary' | 'error';
}

const CustomMenuItem: FC<CustomMenuItemProps> = ({ color, ...props }) => {
  switch (color) {
    case 'primary':
      return <PrimaryMenuItem {...props} />;
    case 'error':
      return <RedMenuItem {...props} />;
    default:
      return <MenuItem {...props} />;
  }
};

export default CustomMenuItem;
