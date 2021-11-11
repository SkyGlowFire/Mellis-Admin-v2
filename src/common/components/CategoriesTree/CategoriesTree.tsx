import { FC, useState, useCallback, useEffect } from 'react';
import { useGetCategoriesTreeQuery } from '~/app/api';
import { makeStyles } from '@mui/styles';
import CategoryItem from './CategoryItem/CategoryItem';
import { Container, Link, Theme } from '@mui/material';
import { ICategory, ICategoryTreeItem } from '~/types/categories';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '0 1rem',
  },
  collapseBtns: {
    display: 'flex',
    '& a': {
      fontSize: '.8rem',
      cursor: 'pointer',
      color: theme.palette.primary.dark,
    },
  },
}));

interface CategoriesTreeProps {
  selectAction: (category: ICategoryTreeItem) => void;
  defaultSelected?: ICategoryTreeItem | ICategory;
}

const CategoriesTree: FC<CategoriesTreeProps> = ({
  selectAction,
  defaultSelected,
}) => {
  const { data } = useGetCategoriesTreeQuery();
  const [treeCollapsed, setTreeCollapsed] = useState<boolean>(false);
  const [collapseTrigger, setCollapseTrigger] = useState<boolean>(false);
  const [selected, setSelected] = useState<ICategoryTreeItem | null>(null);

  useEffect(() => {
    if (!defaultSelected) return;
    const { _id, children, level, path, title, totalProducts } =
      defaultSelected;
    setSelected({ _id, children, level, path, title, totalProducts });
  }, [defaultSelected]);

  const classes = useStyles();

  const selectHandler = useCallback(
    (category: ICategoryTreeItem) => {
      setSelected(category);
      if (selectAction) selectAction(category);
    },
    [selectAction]
  );

  const collapseBtnHadler = (val: boolean) => () => {
    setTreeCollapsed(val);
    setCollapseTrigger((prev) => !prev);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.collapseBtns}>
        <Link variant="body2" gutterBottom onClick={collapseBtnHadler(true)}>
          Collapse All
        </Link>
        <span style={{ margin: '0 .5rem' }}>|</span>
        <Link variant="body2" gutterBottom onClick={collapseBtnHadler(false)}>
          Expand All
        </Link>
      </div>
      <ul style={{ padding: 0 }}>
        {data &&
          data.map((category) => (
            <CategoryItem
              category={category}
              selectHandler={selectHandler}
              selected={selected}
              key={category._id}
              treeCollapsed={treeCollapsed}
              collapseTrigger={collapseTrigger}
            />
          ))}
      </ul>
    </Container>
  );
};

export default CategoriesTree;
