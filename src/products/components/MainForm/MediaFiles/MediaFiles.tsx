import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { Paper, Grid, Typography } from '@mui/material';
import DropBox, { DropBoxProps } from '~/common/components/DropBox/DropBox';
import ImageBox, { ImageBoxprops } from '~/common/components/ImageBox/ImageBox';
import { useFormContext } from 'react-hook-form';
import { ProductFormData } from '../MainForm';
import { MediaFile, Media } from '~/types/image';
import { useCallback } from 'react';
import { addMedia, deleteMedia } from '~/products/state/productSlice';
import { formMedia } from '~/utils/formMedia';

const useStyles = makeStyles({
  root: {
    padding: '1rem 2rem',
    borderRadius: '.5rem',
  },
  images: {
    overflowX: 'auto',
  },
});

const MediaFiles = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { media } = useAppSelector((state) => state.product);
  const { setValue, getValues } = useFormContext<ProductFormData>();

  const uploadHandler: DropBoxProps['actionHandler'] = useCallback(
    (files: MediaFile[]) => {
      const media = getValues('media');
      setValue('media', media.concat(files), { shouldDirty: true });
      dispatch(addMedia(files.map((file) => formMedia(file))));
    },
    [dispatch, getValues, setValue]
  );

  const deleteHandler: ImageBoxprops['deleteHandler'] = useCallback(
    (image: Media) => {
      const media = getValues('media');
      const mediaToRemove = getValues('mediaToRemove');
      if (media.find((file) => file.url === image.url)) {
        setValue(
          'media',
          media.filter((file) => file.url !== image.url)
        );
      } else {
        setValue('mediaToRemove', [...mediaToRemove, image._id], {
          shouldDirty: true,
        });
      }
      dispatch(deleteMedia(image._id));
    },
    [dispatch, getValues, setValue]
  );

  return (
    <>
      <Paper className={classes.root}>
        <Typography gutterBottom>Images / Video</Typography>

        <Grid container spacing={2} className={classes.images} wrap="nowrap">
          <Grid item>
            <DropBox actionHandler={uploadHandler} width={150} height={150} />
          </Grid>
          {media.map((file) => (
            <Grid item key={file._id}>
              <ImageBox
                width={150}
                height={150}
                file={file}
                deleteHandler={deleteHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default MediaFiles;
