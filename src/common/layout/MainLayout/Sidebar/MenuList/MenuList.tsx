import MenuItem from '../MenuItem/MenuItem';
import { List } from '@mui/material';
import { ShoppingCart, Storage, CameraAlt, Payment } from '@mui/icons-material';

const links = [
  { title: 'Products', path: '/products', icon: <ShoppingCart /> },
  { title: 'Categories', path: '/categories', icon: <Storage /> },
  { title: 'Orders', path: '/orders', icon: <Payment /> },
  { title: 'Looks', path: '/looks', icon: <CameraAlt /> },
];

const MenuList = () => {
  return (
    <List component="nav" sx={{ bgcolor: 'background.paper' }}>
      {links.map((link) => (
        <MenuItem link={link} key={link.title + '-link'} />
      ))}
    </List>
  );
};

export default MenuList;
