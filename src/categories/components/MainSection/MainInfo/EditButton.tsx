import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
import { Edit } from '@mui/icons-material';

type EditBtnProps = Omit<ButtonProps, 'variant' | 'color' | 'startIcon'>;

const EditButton: FC<EditBtnProps> = (props) => {
  return (
    <Button
      variant="contained"
      color={'primary'}
      startIcon={<Edit />}
      {...props}
    >
      Edit
    </Button>
  );
};

export default EditButton;
