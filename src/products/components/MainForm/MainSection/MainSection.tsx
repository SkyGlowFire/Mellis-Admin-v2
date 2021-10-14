import { Paper, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextInput from '~/common/components/react-hook-form-inputs/TextInput/TextInput';
import Select from '~/common/components/react-hook-form-inputs/Select/Select';
import Autocomplete from '~/common/components/react-hook-form-inputs/Autocomplete/Autocomplete';

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    borderRadius: '.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
});

const sizes = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' },
];

const colors = [
  'red',
  'green',
  'blue',
  'white',
  'black',
  'yellow',
  'orange',
  'grey',
  'brown',
];

const brands = [
  'Nike',
  'Adidas',
  'Reebok',
  'Puma',
  'Demix',
  'Quicksilver',
  'New Balance',
];

const MainSection = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Grid container spacing={3} style={{ marginBottom: ' 1rem' }}>
          <Grid item xs={6}>
            <TextInput
              label="Name"
              variant="outlined"
              fullWidth
              name="title"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput label="SKU" variant="outlined" fullWidth name="sku" />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              type="number"
              label="Weight"
              variant="outlined"
              fullWidth
              name="weight"
            />
          </Grid>
          <Grid item>
            <Select
              style={{ width: 200 }}
              name="sizes"
              options={sizes}
              multiple
              label="Sizes"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Select
              style={{ width: 160 }}
              name="color"
              options={colors}
              label="Color"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Autocomplete options={brands} name="brand" label="Brand" />
          </Grid>
        </Grid>
        <Typography gutterBottom>Description</Typography>
        <TextInput
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          name="description"
        />
      </Paper>
    </>
  );
};

export default MainSection;
