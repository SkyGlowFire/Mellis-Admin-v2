import { withStyles, createStyles } from '@mui/styles';
import { Tabs, Tab, Theme, TabProps, TabsProps } from '@mui/material';

const NavTabStyles = (theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      marginRight: theme.spacing(2),
      '&:hover': {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      '&$selected': {
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: theme.palette.primary.main,
      },
    },
  });

export const NavTab = withStyles(NavTabStyles)((props: TabProps) => (
  <Tab disableRipple {...props} />
));

const NavTabsStyles = (theme: Theme) =>
  createStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: '80%',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
      },
    },
  });

export const NavTabs = withStyles(NavTabsStyles)((props: TabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));
