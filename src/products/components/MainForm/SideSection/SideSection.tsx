import {
  Paper,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  Theme,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormContext } from 'react-hook-form';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { IProductPopulated } from '~/types/products';
import { TextInputWithIcon } from '~/common/components/react-hook-form-inputs';
import FormSwitch from '~/common/components/react-hook-form-inputs/FormSwitch/FormSwitch';
import { ProductFormData } from '../MainForm';
import { useAppSelector } from '~/app/hooks';

const useStyles = makeStyles<Theme, { enable: boolean }>((theme) => ({
  root: {
    height: '100%',
    padding: '1rem 0',
    borderRadius: '.5rem',
    position: 'relative',
  },
  input: {
    marginBottom: '1rem',
  },
  bulkHeader: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  link: {
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
  },
  enableLabel: {
    color: ({ enable }) =>
      enable ? theme.palette.success.main : theme.palette.error.main,
  },
}));

interface SideSectionProps {
  setCategoryModalOpen: Dispatch<SetStateAction<boolean>>;
  product?: IProductPopulated;
}

const SideSection: FC<SideSectionProps> = ({
  setCategoryModalOpen,
  product,
}) => {
  const { category } = useAppSelector((state) => state.product);
  const {
    formState: { errors, isDirty },
    watch,
    clearErrors,
    trigger,
  } = useFormContext<ProductFormData>();

  const enable = watch('enable');
  const bulkEnable = watch('bulkDiscountEnable');
  const classes = useStyles({ enable });

  useEffect(() => {
    if (bulkEnable) {
      trigger('bulkDiscountPrice');
    } else {
      clearErrors('bulkDiscountPrice');
    }
  }, [bulkEnable, clearErrors, trigger]);

  return (
    <>
      <Paper className={classes.root}>
        <Container>
          <Typography gutterBottom className={classes.title}>
            Price
          </Typography>
          <TextInputWithIcon
            variant="outlined"
            type="number"
            className={classes.input}
            name="price"
            startIcon={<span>$</span>}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Typography gutterBottom>"Compare to" Price</Typography>
          <TextInputWithIcon
            variant="outlined"
            type="number"
            size="small"
            className={classes.input}
            name="comparePrice"
            startIcon={<span>$</span>}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography className={classes.title}>Bulk discount </Typography>
            </Grid>
            <Grid item>
              <FormSwitch
                name="bulkDiscountEnable"
                label={!bulkEnable ? 'Disabled' : 'Enabled'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs sx={{ minWidth: 100 }}>
              <Typography className={classes.bulkHeader} gutterBottom>
                Qty
              </Typography>
              <TextInputWithIcon
                type="number"
                variant="outlined"
                size="small"
                // startIcon={
                //   <Typography variant="body2" style={{ marginRight: '.3rem' }}>
                //     More than:
                //   </Typography>
                // }
                name="bulkDiscountQty"
                InputProps={{ inputProps: { min: 2 } }}
              />
            </Grid>
            <Grid item xs>
              <Typography className={classes.bulkHeader} gutterBottom>
                Price
              </Typography>
              <TextInputWithIcon
                type="number"
                variant="outlined"
                size="small"
                name="bulkDiscountPrice"
                startIcon={<span>$</span>}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </Container>
        <Divider style={{ margin: '1rem 0' }} />
        <Container>
          <Typography
            gutterBottom
            variant="subtitle1"
            display="inline"
            style={{ marginRight: '.5rem' }}
            className={classes.title}
          >
            Category
          </Typography>
          <Link
            className={classes.link}
            onClick={() => setCategoryModalOpen(true)}
          >
            [Assign]
          </Link>
          <Typography
            gutterBottom
            style={{ marginBottom: '.5rem' }}
            variant="body2"
          >
            {category ? category.path.join('/') : 'No category'}
          </Typography>
          {errors.category && (
            <Typography color="red" variant="body2">
              {errors.category.message}
            </Typography>
          )}
          <Grid container alignItems="center">
            <Grid item xs sx={{ marginRight: '6px' }}>
              <Typography variant="subtitle1" className={classes.title}>
                Availability:
              </Typography>
            </Grid>
            <Grid item xs>
              <FormSwitch
                className={classes.enableLabel}
                label={!enable ? 'Disabled' : 'Enabled'}
                style={{ marginBottom: '.5rem' }}
                name="enable"
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.title}
          >
            Stock control
          </Typography>
          <Typography
            gutterBottom
            display="inline"
            style={{ marginRight: '1rem' }}
            variant="body1"
          >
            In stock (15 items)
          </Typography>
          <Link className={classes.link}>[Manage]</Link>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!isDirty}
            sx={{ marginTop: '2rem' }}
          >
            {product ? 'Save product' : 'Add product'}
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default SideSection;
