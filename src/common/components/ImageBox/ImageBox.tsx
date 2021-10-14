import { Button, IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { openImageModal } from '~/common/state/mainSlice';
import { Media } from '~/types/image';
import { useAppDispatch } from '~/app/hooks';

const useStyles = makeStyles<Theme, { width: number; height: number }>(
  (theme) => ({
    root: ({ width, height }) => ({
      borderRadius: '.5rem',
      height: height,
      width: width,
      minWidth: width,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    }),
    overlay: {
      position: 'relative',
      borderRadius: '.5rem',
      width: '100%',
      height: '100%',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.4)',
      color: theme.palette.background.paper,
      opacity: 0,
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        opacity: 1,
      },
    },
    deleteBtn: {
      position: 'absolute',
      color: 'inherit',
      top: 0,
      right: 0,
      cursor: 'pointer',
      transform: 'rotate(0deg)',
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'rotate(90deg)',
      },
    },
    viewBtn: {
      color: 'inherit',
      alignSelf: 'flex-end',
      cursor: 'pointer',
      marginBottom: '.5rem',
      textTransform: 'none',
      transition: '.2s ease all',
    },
  })
);

export interface ImageBoxprops {
  file: Media;
  width: number;
  height: number;
  deleteHandler: (file: Media) => void;
}

const ImageBox: FC<ImageBoxprops> = ({
  file,
  width = 200,
  height = 200,
  deleteHandler,
}) => {
  const classes = useStyles({ width, height });
  const dispatch = useAppDispatch();

  const closeBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (deleteHandler) {
      deleteHandler(file);
    } else {
      console.log(file);
    }
  };

  const viewBtnHandler = () => {
    dispatch(openImageModal(file.url));
  };

  return (
    <>
      <div
        className={classes.root}
        style={{ backgroundImage: `url(${file.url})` }}
      >
        <div className={classes.overlay} onClick={viewBtnHandler}>
          <IconButton
            title="Delete image"
            className={classes.deleteBtn}
            onClick={closeBtnHandler}
          >
            <CloseIcon />
          </IconButton>
          <Button className={classes.viewBtn}>View</Button>
        </div>
      </div>
    </>
  );
};

export default ImageBox;
