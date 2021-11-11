import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useConfirm } from '~/app/hooks';

const ConfirmModal: FC = () => {
  const { onCancel, onConfirm, confirmState } = useConfirm();

  return (
    <Dialog
      open={confirmState.show}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      {confirmState.title && <DialogTitle>{confirmState.title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{confirmState.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{confirmState.noBtnText}</Button>
        <Button onClick={onConfirm} color="error">
          {confirmState.yesBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
