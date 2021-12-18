import {
  Chip,
  Avatar,
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, MouseEvent } from 'react';
import { logOut } from '~/auth/state/authSlice';

const ProfileSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setOpen((previousOpen) => !previousOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Chip
        avatar={<Avatar>{user?.username[0].toUpperCase()}</Avatar>}
        deleteIcon={<SettingsIcon />}
        onClick={handleClick}
        onDelete={handleClick}
        variant="outlined"
        color="primary"
        label={user?.username || user?.firstName}
        sx={{ py: 2, fontSize: '1.2rem' }}
        size="medium"
      />
      <Popper anchorEl={anchorEl} open={open} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={500}>
            <Paper sx={{ width: 200 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ px: 3, py: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {user?.firstName || user?.username}
                  </Typography>
                  <Link
                    onClick={logOutHandler}
                    sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                    underline="hover"
                  >
                    Log out
                  </Link>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
