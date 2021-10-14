import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { Typography, Theme } from '@mui/material';
import { NavTabs, NavTab } from '~/common/components/NavTabs/NavTabs';
import { makeStyles } from '@mui/styles';
import { ICategory } from '~/types/categories';
import MainInfo from './MainInfo/MainInfo';
import ProductsInfo from './ProductsInfo/ProductsInfo';

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
  selectedCategory: ICategory | null;
}

const MainSection: FC<MainSectionProps> = ({
  createMode,
  selectedCategory,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (createMode) setPage(0);
  }, [createMode]);

  const changePage = (e: SyntheticEvent, newValue: any) => {
    setPage(newValue);
  };
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Typography gutterBottom>
          {!createMode
            ? selectedCategory && selectedCategory.path.join('/')
            : !selectedCategory
            ? 'New Root Category'
            : `New SubCategory for ${selectedCategory.path.join('/')}`}
        </Typography>
        <NavTabs
          value={page}
          indicatorColor="primary"
          textColor="primary"
          onChange={changePage}
        >
          <NavTab label="General" />
          {!createMode && <NavTab label="Products" />}
        </NavTabs>
      </div>
      <div className={classes.content}>
        {page === 0 ? (
          <MainInfo
            selectedCategory={selectedCategory}
            createMode={createMode}
          />
        ) : (
          <ProductsInfo selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default MainSection;
