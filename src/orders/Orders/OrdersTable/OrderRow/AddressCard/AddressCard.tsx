import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Address } from '~/types/orders';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: '1px solid black',
    marginBottom: '1rem',
    padding: '.5rem 1rem',
    maxWidth: 500,
    [theme.breakpoints.up('md')]: {
      maxWidth: 600,
    },
  },
}));

interface AddressCardProps {
  address: Address;
}

const AddressCard: FC<AddressCardProps> = ({ address }) => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    streetNumber,
    city,
    streetName,
    phone,
    zip,
    apartment,
  } = address;

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        {firstName} {lastName}
      </Typography>
      <Typography variant="body2" style={{ fontSize: '.8rem' }}>
        {city}, {streetName} street, home #{streetNumber}
        {apartment && <>{`, apartment #${apartment}`}</>}
      </Typography>
      <Typography variant="body2">postal code: {zip}</Typography>
      <Typography
        variant="body2"
        style={{ fontSize: '.8rem', marginBottom: '1rem' }}
      >
        phone: {phone || 'No phone'}
      </Typography>
    </div>
  );
};

export default AddressCard;
