import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
import { Save } from '@mui/icons-material';

type SaveBtnProps = Omit<ButtonProps, 'variant' | 'color' | 'startIcon'>;

const SaveButton: FC<SaveBtnProps> = (props) => {
  return (
    <Button
      variant="contained"
      color={'secondary'}
      startIcon={<Save />}
      {...props}
    >
      Save
    </Button>
  );
};

export default SaveButton;
