import { FC, useState, useEffect } from 'react';
import { ICategoryTreeItem } from '~/types/categories';
import { makeStyles } from '@mui/styles';
import { Link, Collapse, IconButton } from '@mui/material';
import { fromUrlString } from '~/utils/textFormatters';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

const useStyles = makeStyles<any, { level: number }>(() => ({
  title: {
    position: 'relative',
    cursor: 'pointer',
    marginLeft: ({ level }) => level * 10,
  },
  collapseBtn: {
    position: 'absolute',
    left: -25,
    fontSize: 8,
    padding: 0,
  },
}));

interface CategoryItemProps {
  category: ICategoryTreeItem;
  selected: ICategoryTreeItem | null;
  selectHandler: (cat: ICategoryTreeItem) => void;
  treeCollapsed: boolean;
  collapseTrigger: boolean;
}

const CategoryItem: FC<CategoryItemProps> = (props) => {
  const { category, collapseTrigger, selectHandler, selected, treeCollapsed } =
    props;
  const { children, totalProducts, title } = category;
  const [collapse, setCollapse] = useState<boolean>(false);
  const classes = useStyles({ level: category.level });
  useEffect(() => {
    setCollapse(treeCollapsed);
  }, [treeCollapsed, collapseTrigger]);

  return (
    <>
      <li className={classes.title}>
        <Link
          onClick={() => selectHandler(category)}
          underline={
            selected && category._id === selected._id ? 'always' : 'hover'
          }
        >
          {children?.length > 0 && (
            <IconButton
              color="primary"
              component="span"
              className={classes.collapseBtn}
              size="small"
              onClick={() => setCollapse((prev) => !prev)}
            >
              {!collapse ? (
                <IndeterminateCheckBoxOutlinedIcon fontSize="small" />
              ) : (
                <AddBoxIcon fontSize="small" />
              )}
            </IconButton>
          )}

          <span>
            {fromUrlString(title)} ({totalProducts})
          </span>
        </Link>
      </li>
      {children.length > 0 && (
        <Collapse in={!collapse}>
          <ul>
            {children.map((cat) => (
              <CategoryItem
                selectHandler={selectHandler}
                selected={selected}
                key={cat._id}
                treeCollapsed={treeCollapsed}
                collapseTrigger={collapseTrigger}
                category={cat}
              />
            ))}
          </ul>
        </Collapse>
      )}
    </>
  );
};

export default CategoryItem;
