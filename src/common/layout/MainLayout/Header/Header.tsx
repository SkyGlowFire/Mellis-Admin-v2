import { Avatar, Box, ButtonBase, Theme } from '@mui/material';
import Logo from '../Logo/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  headerAvatar: {
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
  },
  boxContainer: {
    width: '228px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
}));

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const classes = useStyles();
  return (
    <div className={classes.boxContainer}>
      <Box
        component="span"
        sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
      >
        <Logo />
      </Box>
      <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Avatar
          variant="rounded"
          className={classes.headerAvatar}
          onClick={toggleSidebar}
          color="inherit"
        >
          <MenuIcon fontSize="medium" />
        </Avatar>
      </ButtonBase>
    </div>
  );
};

export default Header;
