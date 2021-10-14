import { Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { closeImageModal } from '~/common/state/mainSlice';

const useStyles = makeStyles({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
  img: {
    borderRadius: '.3rem',
  },
});

const ImageModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { url, open } = useAppSelector((state) => state.main.imageModal);
  return (
    <Dialog
      fullWidth
      open={open}
      scroll="body"
      onClose={() => dispatch(closeImageModal())}
      className={classes.root}
      maxWidth="lg"
    >
      <DialogContent>
        <img src={url} className={classes.img} width="100%" alt="" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
