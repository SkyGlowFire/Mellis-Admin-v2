import { FC } from 'react';
import { Box, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '~/common/components/react-hook-form-inputs/TextInput/TextInput';
import { ICategoryTreeItem } from '~/types/categories';
import { CreateCategoryDto } from '~/app/dto/create-category.dto';
import {
  useAddCategoryMutation,
  useLazyGetCategoryQuery,
  useUpdateCategoryMutation,
} from '~/app/api';
import SaveIcon from '@mui/icons-material/Save';
import { setAlert } from '~/alerts/alertSlice';
import { useAppDispatch } from '~/app/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  description: {
    maxWidth: 700,
    width: '100%',
    border: `1px solid ${theme.palette.primary.light}`,
    position: 'relative',
    paddingBottom: '2rem',
    height: 300,
    borderRadius: 10,
  },
  descriptionHeader: {
    backgroundColor: theme.palette.primary.light,
    padding: '.5rem',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textarea: {
    resize: 'none',
    outline: 'none',
    padding: '1rem',
    fontSize: '1rem',
    width: '100%',
    border: 'none',
  },
  titleInput: {
    marginBottom: '1rem',
  },
  submitBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
}));

interface MainInfoProps {
  createMode: boolean;
  selectedCategory: ICategoryTreeItem | null;
}

type IFormData = {
  title: string;
  text: string;
};

const MainInfo: FC<MainInfoProps> = ({ createMode, selectedCategory }) => {
  const classes = useStyles();
  const [getCategory, { data: category, isLoading }] =
    useLazyGetCategoryQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCategory) getCategory(selectedCategory._id);
  }, [selectedCategory, getCategory]);

  const methods = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { title: '', text: '' },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (!createMode && category) {
      reset({
        title: category.title,
        text: category.text,
      });
    } else {
      reset({ title: '', text: '' });
    }
  }, [category, createMode, reset]);

  const [addCategory, { isSuccess: createSuccess, originalArgs: createArgs }] =
    useAddCategoryMutation();
  const [
    updateCategory,
    { isSuccess: updateSuccess, originalArgs: updateArgs },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (createSuccess) {
      reset({ title: '', text: '' });
      dispatch(
        setAlert(`Category "${createArgs?.title}" has been created`, 'success')
      );
    }
  }, [createSuccess, createArgs, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(
        setAlert(`Category "${updateArgs?.title}" has been updated`, 'success')
      );
    }
  }, [updateSuccess, updateArgs, dispatch]);

  const onSubmit = (data: IFormData) => {
    if (createMode) {
      let values: CreateCategoryDto = { ...data };
      if (selectedCategory) values.parentId = selectedCategory._id;
      addCategory(values);
    } else {
      if (selectedCategory)
        updateCategory({ id: selectedCategory._id, ...data });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          label="Title"
          name="title"
          className={classes.titleInput}
          disabled={isLoading}
        />
        <div className={classes.description}>
          <div className={classes.descriptionHeader}>Description</div>
          <TextInput
            placeholder="No description"
            name="text"
            className={classes.textarea}
            variant="outlined"
            multiline
            rows="7"
            disabled={isLoading}
          />
        </div>

        <Box sx={{ position: 'absolute', top: '2rem', right: '2rem' }}>
          <Button
            variant="contained"
            color={'primary'}
            startIcon={<SaveIcon />}
            disabled={!isDirty}
            type="submit"
          >
            {createMode ? 'Create' : 'Update'}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default MainInfo;
