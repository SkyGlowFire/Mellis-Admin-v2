import {
  Button,
  Paper,
  Grow,
  Popper,
  MenuList,
  ClickAwayListener,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useState, useRef, FC } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomMenuItem from '~/common/components/CustomMenuItem/CustomMenuItem';
import {
  useDeleteProductsMutation,
  useDisableProductsMutation,
  useEnableProductsMutation,
} from '~/app/api';

interface BulkUpdateBtnProps {
  selected: string[];
}

const BulkUpdateBtn: FC<BulkUpdateBtnProps> = ({ selected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);
  const [deleteProducts] = useDeleteProductsMutation();
  const [enableProducts] = useEnableProductsMutation();
  const [disableProducts] = useDisableProductsMutation();

  const options = [
    {
      name: 'Enable selected',
      action: () => enableProducts({ products: selected }),
    },
    {
      name: 'Disable selected',
      action: () => disableProducts({ products: selected }),
    },
    {
      name: 'Delete selected',
      action: () => deleteProducts({ products: selected }),
    },
  ];

  const handleMenuItemClick = (idx: number) => () => {
    setOpen(false);
    options[idx].action();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        ref={anchorRef}
        onClick={handleToggle}
        endIcon={<ArrowDropDownIcon />}
      >
        Bulk update
      </Button>
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
                <MenuList>
                  {options.slice(0, -1).map((option, idx) => (
                    <CustomMenuItem
                      color="primary"
                      key={`${option.name}`}
                      onClick={handleMenuItemClick(idx)}
                    >
                      <ListItemText>{option.name}</ListItemText>
                    </CustomMenuItem>
                  ))}
                  <CustomMenuItem
                    color="error"
                    key={`${options[options.length - 1].name}`}
                    onClick={handleMenuItemClick(options.length - 1)}
                  >
                    <ListItemText>
                      {options[options.length - 1].name}
                    </ListItemText>
                    <ListItemIcon>
                      {' '}
                      <DeleteForeverIcon />
                    </ListItemIcon>
                  </CustomMenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default BulkUpdateBtn;
