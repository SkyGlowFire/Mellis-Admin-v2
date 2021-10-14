import {
  Dialog,
  Grid,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
  Container,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import CategoriesTree from '~/common/components/CategoriesTree/CategoriesTree';
import { useState, FC } from 'react';
import { IProductPopulated } from '~/types/products';
import { ICategory } from '~/types/categories';

const useStyles = makeStyles({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
});

interface CategoryModalProps {
  open: boolean;
  onSelect: (category: ICategory) => void;
  closeHandler: () => void;
  product?: IProductPopulated;
}

const CategoryModal: FC<CategoryModalProps> = ({
  open,
  closeHandler,
  onSelect,
  product,
}) => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const onSubmit = () => {
    selectedCategory && onSelect(selectedCategory);
    closeHandler();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      scroll="body"
      onClose={closeHandler}
      className={classes.root}
      maxWidth="sm"
    >
      <DialogTitle>Select Category</DialogTitle>
      <DialogContent>
        <Container>
          <Grid container>
            <Grid item xs>
              <Typography gutterBottom>
                {selectedCategory?.path.join('/') || 'No category'}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={onSubmit}
                disabled={!selectedCategory}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <CategoriesTree
            selectAction={setSelectedCategory}
            defaultSelected={product && product.category}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
