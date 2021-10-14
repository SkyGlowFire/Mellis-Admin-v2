import { makeStyles } from '@mui/styles';
import { appbarHeight, sideNavWidth } from '~/styles/constants';
import { Drawer, Theme, useMediaQuery, useTheme, Box } from '@mui/material';
import { FC } from 'react';
import Logo from '../Logo/Logo';
import { BrowserView, MobileView } from 'react-device-detect';
import MenuList from './MenuList/MenuList';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: sideNavWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: sideNavWidth,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      top: appbarHeight,
    },
    padding: '1rem',
  },
  boxContainer: {
    display: 'flex',
    padding: '16px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

interface SideBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SideBarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <div className={classes.boxContainer}>
          <Logo />
        </div>
      </Box>
      <BrowserView>
        <PerfectScrollbar component="div">
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Drawer
        anchor="left"
        variant={matchUpMd ? 'persistent' : 'temporary'}
        open={sidebarOpen}
        onClose={toggleSidebar}
        classes={{ paper: classes.drawerPaper }}
        color="inherit"
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default Sidebar;
