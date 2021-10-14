import {
  Button,
  ButtonGroup,
  Paper,
  MenuItem,
  Grow,
  Popper,
  MenuList,
  ClickAwayListener,
} from '@mui/material';
import { useState, useRef, FC } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDeleteLookMutation } from '~/app/api';
import { IPopulatedLook } from '~/types/looks';

interface EditButtonProps {
  look: IPopulatedLook;
}

const EditButton: FC<EditButtonProps> = ({ look }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const anchorRef = useRef(null);
  const history = useHistory();
  const [deleteLook] = useDeleteLookMutation();

  const options = [
    {
      name: 'Edit',
      action: () => history.push(`/look/${look._id}`),
    },
    {
      name: 'Delete',
      action: () => deleteLook(look._id),
    },
  ];

  const handleClick = () => {
    options[index].action();
  };

  const pickAction = (idx: number) => () => {
    setIndex(idx);
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ButtonGroup
        variant="contained"
        color={index === 0 ? 'primary' : 'error'}
        ref={anchorRef}
      >
        <Button onClick={handleClick}>{options[index].name}</Button>
        <Button size="small" onClick={toggleMenu}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList style={{ zIndex: 20 }}>
                  {options.map((option, idx) => (
                    <MenuItem
                      key={`${option.name}-${look._id}`}
                      onClick={pickAction(idx)}
                      selected={idx === index}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default EditButton;
