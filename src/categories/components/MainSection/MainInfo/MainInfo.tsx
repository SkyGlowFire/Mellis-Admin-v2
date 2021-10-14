import { FC } from 'react';
import { Box, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import SaveButton from './SaveButton';
import EditButton from './EditButton';
import { useForm, FormProvider } from 'react-hook-form';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '~/common/components/react-hook-form-inputs/TextInput/TextInput';
import { ICategory } from '~/types/categories';
import { CreateCategoryDto } from '~/app/dto/create-category.dto';
import { useAddCategoryMutation, useUpdateCategoryMutation } from '~/app/api';

const useStyles = makeStyles<Theme>((theme) => ({
  description: {
    width: 700,
    border: `1px solid ${theme.palette.secondary.light}`,
    position: 'relative',
    paddingBottom: '2rem',
    height: 300,
    borderRadius: 10,
  },
  descriptionHeader: {
    backgroundColor: theme.palette.secondary.light,
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
  selectedCategory: ICategory | null;
}

type IFormData = {
  title: string;
  text: string;
};

const MainInfo: FC<MainInfoProps> = ({ createMode, selectedCategory }) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState<boolean>(false);
  const methods = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { title: '', text: '' },
  });
  const { handleSubmit, reset } = methods;

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = (data: IFormData) => {
    if (createMode) {
      let values: CreateCategoryDto = { ...data };
      if (selectedCategory) values.parentId = selectedCategory._id;
      addCategory(values);
    } else {
      selectedCategory && updateCategory({ id: selectedCategory._id, ...data });
    }
    setEditMode(false);
  };

  useEffect(() => {
    setEditMode(createMode);
  }, [createMode]);

  useEffect(() => {
    if (selectedCategory && !createMode) {
      reset({
        title: selectedCategory.title,
        text: selectedCategory.text,
      });
    } else {
      reset({ title: '', text: '' });
    }
  }, [selectedCategory, createMode, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={8}>
            <TextInput
              disabled={!editMode}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Title"
              name="title"
              className={classes.titleInput}
            />
            <div className={classes.description}>
              <div className={classes.descriptionHeader}>Description</div>
              <TextInput
                placeholder="No description"
                name="text"
                className={classes.textarea}
                disabled={!editMode}
                variant="outlined"
                multiline
                rows="9"
              />
            </div>
          </Grid>
        </Grid>

        <Box sx={{ position: 'absolute', top: '2rem', right: '2rem' }}>
          {!editMode ? (
            <EditButton onClick={() => setEditMode(true)} />
          ) : (
            <SaveButton onClick={handleSubmit(onSubmit)} />
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default MainInfo;
