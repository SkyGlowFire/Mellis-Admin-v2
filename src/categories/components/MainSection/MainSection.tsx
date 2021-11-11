import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { Typography, Theme } from '@mui/material';
import { NavTabs, NavTab } from '~/common/components/NavTabs/NavTabs';
import { makeStyles } from '@mui/styles';
import MainInfo from './MainInfo/MainInfo';
import ProductsInfo from './ProductsInfo/ProductsInfo';
import BestSeller from './BestSeller/Bestseller';
import { ICategoryTreeItem } from '~/types/categories';
import { useLazyGetCategoryQuery } from '~/app/api';

const useStyles = makeStyles<Theme>((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  content: {
    flex: 1,
    padding: '1rem',
  },
  header: {
    paddingLeft: '1rem',
    paddingTop: '1rem',
    paddingBottom: '.5rem',
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
}));

interface MainSectionProps {
  createMode: boolean;
  selectedCategory: ICategoryTreeItem | null;
}

const MainSection: FC<MainSectionProps> = ({
  createMode,
  selectedCategory,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [getCategory, { data: category }] = useLazyGetCategoryQuery();

  useEffect(() => {
    if (selectedCategory) getCategory(selectedCategory._id);
  }, [selectedCategory]);

  useEffect(() => {
    if (createMode) setPage(0);
  }, [createMode]);

  const changePage = (e: SyntheticEvent, newValue: any) => {
    setPage(newValue);
  };
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        {createMode ? (
          <Typography gutterBottom>
            {selectedCategory
              ? `New SubCategory for ${selectedCategory.path.join('/')}`
              : 'New Root Category'}
          </Typography>
        ) : (
          <Typography gutterBottom>
            {selectedCategory ? selectedCategory.path.join('/') : ''}
          </Typography>
        )}
        <NavTabs
          value={page}
          indicatorColor="primary"
          textColor="primary"
          onChange={changePage}
        >
          <NavTab label="General" />
          {!createMode && <NavTab label="Products" />}
          {!createMode && category?.level === 1 && (
            <NavTab label="Bestseller" />
          )}
        </NavTabs>
      </div>
      <div className={classes.content}>
        {page === 0 && (
          <MainInfo
            selectedCategory={selectedCategory}
            createMode={createMode}
          />
        )}
        {page === 1 && category && <ProductsInfo category={category} />}
        {page === 2 && category?.level === 1 && (
          <BestSeller category={category} />
        )}
      </div>
    </div>
  );
};

export default MainSection;
