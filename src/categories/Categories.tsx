import { FC, useState } from 'react';
import CategoriesTree from '~/common/components/CategoriesTree/CategoriesTree';
import MainSection from './components/MainSection/MainSection';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDeleteCategoryMutation } from '~/app/api';
import { ICategoryTreeItem } from '~/types/categories';
import { useConfirm } from '~/app/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    maxWidth: 1600,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  btnGroup: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
    marginBottom: '1rem',
  },
  container: {
    flex: 1,
    minHeight: 480,
  },
  side: {
    borderRight: `1px solid ${theme.palette.primary.light}`,
    paddingTop: '1rem',
    overflowY: 'auto',
  },
}));

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryTreeItem | null>(null);
  const [createMode, setCreateMode] = useState<boolean>(true);
  const classes = useStyles();
  const { confirm } = useConfirm();

  const addRootHandler = () => {
    setSelectedCategory(null);
    setCreateMode(true);
  };

  const selectCategory = (category: ICategoryTreeItem) => {
    setSelectedCategory(category);
    setCreateMode(false);
  };

  const addSubCategoryHandler = () => {
    setCreateMode(true);
  };

  const deleteHandler = async () => {
    const confirmed = await confirm({
      text: 'Are you sure you want to delete this category?',
      title: 'Deleting category',
      yesBtnText: 'Delete',
      noBtnText: 'Cancel',
    });
    if (selectedCategory && confirmed) deleteCategory(selectedCategory._id);
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <div className={classes.btnGroup}>
        <Button variant="contained" color="primary" onClick={addRootHandler}>
          + Add Root Category
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={addSubCategoryHandler}
          disabled={!selectedCategory}
        >
          + Add SubCategory
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!selectedCategory}
          onClick={deleteHandler}
        >
          Delete Category
        </Button>
      </div>
      <Paper>
        <Grid container className={classes.container}>
          <Grid item xs={3} className={classes.side}>
            <Container sx={{ maxHeight: '600px', overflowY: 'auto' }}>
              <Typography variant="subtitle1" gutterBottom>
                Categories
              </Typography>
              <CategoriesTree selectAction={selectCategory} />
            </Container>
          </Grid>
          <Grid item xs={9}>
            <MainSection
              createMode={createMode}
              selectedCategory={selectedCategory}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default Categories;
