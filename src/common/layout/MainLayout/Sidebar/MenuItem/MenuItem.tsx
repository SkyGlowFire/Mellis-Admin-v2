import { FC, ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';

const useStyles = makeStyles<Theme, { selected: boolean }>((theme) => ({
  root: {
    marginBottom: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: 12,
  },
}));

interface MenuItemProps {
  link: {
    title: string;
    path: string;
    icon: ReactElement;
  };
}

const MenuItem: FC<MenuItemProps> = ({ link: { icon, path, title } }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setSelected(pathname === path);
  }, [pathname, path]);

  const classes = useStyles({ selected });

  return (
    <ListItemButton
      component={Link}
      to={path}
      key={title}
      selected={selected}
      className={classes.root}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        // primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
      />
    </ListItemButton>
  );
};

export default MenuItem;
