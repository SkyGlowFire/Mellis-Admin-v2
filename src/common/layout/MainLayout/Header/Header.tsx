import { Avatar, Box, ButtonBase, Stack, Theme } from '@mui/material';
import Logo from '../Logo/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import ProfileSection from './ProfileSection';

const useStyles = makeStyles<Theme>((theme) => ({
  navBtn: {
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
  },
  logoSection: {
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
    <Stack
      justifyContent="space-between"
      direction="row"
      sx={{ width: '100%' }}
    >
      <div className={classes.logoSection}>
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <Logo />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            className={classes.navBtn}
            onClick={toggleSidebar}
            color="inherit"
          >
            <MenuIcon fontSize="medium" />
          </Avatar>
        </ButtonBase>
      </div>
      <ProfileSection />
    </Stack>
  );
};

export default Header;
