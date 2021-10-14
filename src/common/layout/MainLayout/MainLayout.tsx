import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { sideNavWidth, appbarHeight } from '~/styles/constants';
import { AppBar, Theme, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Alerts from '~/alerts/Alerts';

const useStyles = makeStyles<Theme, { sidebarOpen: boolean }>((theme) => ({
  main: {
    position: 'relative',
    marginLeft: 10,
    marginRight: 10,
    minHeight: `calc(100vh - ${appbarHeight}px)`,
    marginTop: appbarHeight,
    backgroundColor: theme.palette.primary.light,
    padding: 16,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
      marginRight: 20,
      padding: 24,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: ({ sidebarOpen }) => (sidebarOpen ? sideNavWidth + 20 : 20),
      padding: 40,
    },
  },
  appbar: {
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('width'),
    height: appbarHeight,
  },
}));

const MainLayout: FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  function toggleSidebar(): any {
    setSidebarOpen((prev) => !prev);
  }
  const classes = useStyles({ sidebarOpen });
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    setSidebarOpen(!matchDownMd);
  }, [matchDownMd]);
  return (
    <>
      <Alerts />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <Header toggleSidebar={toggleSidebar} />
        </Toolbar>
      </AppBar>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={classes.main}>
        <>{children}</>
      </div>
    </>
  );
};

export default MainLayout;
