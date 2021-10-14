import { makeStyles } from '@mui/styles';
import {
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import { ILook, IPopulatedLook } from '~/types/looks';
import { FC, useState } from 'react';
import LabelSwitch from '~/common/components/form-inputs/LabelSwitch/LabelSwitch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditButton from './EditButton/EditButton';
import ProductRow from './ProductRow/ProductRow';

const useStyles = makeStyles<Theme, { enable: boolean }>((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    padding: '.5rem',
  },
  main: {},
  img: {
    width: 80,
    minWidth: 80,
    marginRight: '1rem',
  },
  itemImage: {},
  label: {
    color: ({ enable }) =>
      enable ? theme.palette.success.main : theme.palette.error.main,
  },
  items: {
    padding: '1rem',
    marginTop: '.5rem',
  },
}));

interface LookRowProps {
  look: IPopulatedLook;
  checked: boolean;
  selectHandler: (id: string) => () => void;
}

const LookRow: FC<LookRowProps> = ({ look, selectHandler, checked }) => {
  const classes = useStyles({ enable: look.enable });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={classes.root}>
      <Grid container className={classes.main} alignItems="center" spacing={2}>
        <Grid item>
          <Checkbox onChange={selectHandler(look._id)} checked={checked} />
        </Grid>
        <Grid item className={classes.img} xs={1}>
          <img src={`${look.image.url}`} style={{ width: '100%' }} alt="" />
        </Grid>
        <Grid item xs>
          <LabelSwitch
            color="success"
            label={look.enable ? 'Enable' : 'Disable'}
            className={classes.label}
            checked={look.enable}
          />
        </Grid>
        <Grid item xs container spacing={2} alignItems="center">
          <Grid item>
            <Typography>Items: {look.items.length}</Typography>
          </Grid>
          <Grid item xs>
            <IconButton onClick={() => setOpen((prev) => !prev)} size="small">
              {!open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <EditButton look={look} />
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs className={classes.items}>
            {look.items.map((item) => (
              <ProductRow product={item} />
            ))}
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
};

export default LookRow;
