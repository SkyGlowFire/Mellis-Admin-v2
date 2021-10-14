import { useCallback } from 'react';
import { Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormContext } from 'react-hook-form';
import DropBox, { DropBoxProps } from '~/common/components/DropBox/DropBox';
import ImageBox, { ImageBoxprops } from '~/common/components/ImageBox/ImageBox';
import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { Media, MediaFile } from '~/types/image';
import { setImage } from '~/products/state/productSlice';
import { ProductFormData } from '../MainForm';
import { formMedia } from '~/utils/formMedia';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    borderRadius: '.5rem',
  },
  error: {
    fontSize: '.75rem',
    marginTop: '.5rem',
  },
});

const MainImage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { image } = useAppSelector((state) => state.product);
  const {
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext<ProductFormData>();

  const uploadHandler: DropBoxProps['actionHandler'] = useCallback(
    (files: MediaFile[]) => {
      setValue('image', files[0], { shouldDirty: true });
      trigger('image');
      dispatch(setImage(formMedia(files[0])));
    },
    [dispatch, setValue, trigger]
  );

  const deleteHandler: ImageBoxprops['deleteHandler'] = useCallback(() => {
    dispatch(setImage(null));
    setValue('hasImage', false, { shouldDirty: true });
    setValue('image', null);
    trigger('image');
  }, [dispatch, setValue, trigger]);

  return (
    <>
      <Paper className={clsx(classes.root)}>
        <Typography gutterBottom>Main Image</Typography>
        {image ? (
          <ImageBox
            width={150}
            height={150}
            file={image}
            deleteHandler={deleteHandler}
          />
        ) : (
          <DropBox
            actionHandler={uploadHandler}
            width={150}
            height={150}
            error={Boolean(errors.image)}
          />
        )}
        {Boolean(errors.image) && (
          <Typography color="red" variant="body2" className={classes.error}>
            {errors.image?.message}
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default MainImage;
