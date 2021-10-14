import { ButtonBase, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <ButtonBase disableRipple component={Link} to="/">
      <Typography variant="h5">Mellis</Typography>
    </ButtonBase>
  );
};

export default Logo;
