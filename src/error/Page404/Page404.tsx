import { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: 100,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
    fontSize: 60,
  },
}));

interface Page404Props {}

const Page404: FC<Page404Props> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.title}>
        <WarningRoundedIcon
          className={classes.icon}
          fontSize="large"
          color="error"
        />
        <Typography variant="h4">Page Not Found</Typography>
      </div>
      <Typography variant="body1">Sorry, this page does not exist</Typography>
    </Container>
  );
};

export default Page404;
