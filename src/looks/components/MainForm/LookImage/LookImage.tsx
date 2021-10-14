import { FC, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import DropBox, { DropBoxProps } from '~/common/components/DropBox/DropBox';
import { MediaFile } from '~/types/image';
import { LookFormData } from '../MainForm';
import { setImage } from '~/looks/state/lookSlice';
import { formMedia } from '~/utils/formMedia';
import ImageBox, { ImageBoxprops } from '~/common/components/ImageBox/ImageBox';
import { Typography } from '@mui/material';

const LookImage: FC = () => {
  const { image } = useAppSelector((state) => state.look);
  const dispatch = useAppDispatch();
  const {
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext<LookFormData>();

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
      {image ? (
        <ImageBox
          file={image}
          deleteHandler={deleteHandler}
          width={180}
          height={180}
        />
      ) : (
        <DropBox
          actionHandler={uploadHandler}
          width={180}
          height={180}
          error={Boolean(errors.image)}
        />
      )}
      {errors.image && (
        <Typography color="red">{errors.image.message}</Typography>
      )}
    </>
  );
};

export default LookImage;
