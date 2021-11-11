import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from './validationSchema';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { MediaFile } from '~/types/image';
import LookImage from './LookImage/LookImage';
import { ILook, LookOrientation } from '~/types/looks';
import FormSwitch from '~/common/components/react-hook-form-inputs/FormSwitch/FormSwitch';
import Select from '~/common/components/react-hook-form-inputs/Select/Select';
import { useAppDispatch } from '~/app/hooks';
import { setImage } from '~/looks/state/lookSlice';
import {
  useAddLookMutation,
  useGetProductsQuery,
  useUpdateLookMutation,
} from '~/app/api';
import { useState } from 'react';
import AddProductsModal from './AddProductsModal/AddProductsModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomProductsTable, {
  CustomProductsTableProps,
  TablePropsMultiple,
} from '~/common/components/CustomProductsTable/CustomProductsTable';
import { useHistory } from 'react-router-dom';

interface MainFormProps {
  look?: ILook;
}

export type LookFormData = {
  enable: boolean;
  image: null | MediaFile;
  orientation: LookOrientation;
  hasImage: boolean;
  items: string[];
};

const defaultValues = {
  enable: false,
  image: null,
  orientation: 'horizontal' as LookOrientation,
  hasImage: false,
  items: [],
};

const MainForm: FC<MainFormProps> = ({ look }) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const methods = useForm<LookFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    trigger,
    setValue,
    watch,
  } = methods;

  const enable = watch('enable');
  const items = watch('items');
  const [addLook, { isSuccess: createSuccess, data: newLook }] =
    useAddLookMutation();
  const [updateLook] = useUpdateLookMutation();

  const dispatch = useAppDispatch();

  const { data: products, refetch } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((product) => items.includes(product._id)),
    }),
  });

  useEffect(() => {
    if (!look) return;
    const { image, _id, ...rest } = look;
    reset({
      ...rest,
      hasImage: true,
      image: null,
    });
    dispatch(setImage(look.image));
  }, [look, reset, dispatch]);

  useEffect(() => {
    if (newLook) history.push(`/look/${newLook._id}`);
  }, [createSuccess, newLook]);

  const onSubmit = (values: LookFormData) => {
    console.log(values);
    const { hasImage, items, image, ...data } = values;
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (image) {
      formData.append('image', image);
    }
    items.forEach((item) => {
      formData.append('items[]', item);
    });
    if (!look) {
      addLook(formData);
    } else {
      updateLook({ id: look._id, data: formData });
    }
  };

  const deleteItems: TablePropsMultiple['actionHandler'] = useCallback(
    (selected) => {
      setValue(
        'items',
        items.filter((id) => !selected.includes(id)),
        { shouldDirty: true }
      );
      trigger('items');
      refetch();
    },
    [items, setValue]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddProductsModal
          open={modalOpen}
          closeHandler={() => setModalOpen(false)}
        />
        <Paper style={{ marginBottom: '1rem', padding: '1rem', width: '50%' }}>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <LookImage />
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="column"
              alignItems="flex-start"
            >
              <FormSwitch
                name="enable"
                label={!enable ? 'Disabled' : 'Enabled'}
                style={{ marginBottom: '1rem' }}
              />
              <Select
                name="orientation"
                label="Orientation"
                sx={{ minWidth: 200 }}
                options={[
                  { value: 'horizontal', label: 'Horizontal' },
                  { value: 'vertical', label: 'Vertical' },
                ]}
              />
              <Button
                sx={{ marginTop: 'auto' }}
                variant="contained"
                type="submit"
                color="primary"
                disabled={!isDirty}
                onClick={handleSubmit(onSubmit)}
              >
                {look ? 'Save Look' : 'Add new look'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>
            Look items
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth={false}
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: '1rem' }}
          >
            Add Items
          </Button>
          {products && products.length !== 0 && (
            <CustomProductsTable
              type="multiple"
              products={products}
              actionText="Remove products"
              actionColor="error"
              actionHandler={deleteItems}
              actionIcon={RemoveIcon}
            />
          )}
          {errors.items && (
            <Typography variant="subtitle1" color="red">
              {'*Please add items'}
            </Typography>
          )}
        </Paper>
      </form>
    </FormProvider>
  );
};

export default MainForm;
