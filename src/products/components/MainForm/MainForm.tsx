import { Grid, Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProductPopulated, Size } from '~/types/products';
import { useAddProductMutation, useUpdateProductMutation } from '~/app/api';
import CategoryModal from './CategoryModal/CategoryModal';
import {
  selectCategory,
  setImage,
  setMedia,
} from '~/products/state/productSlice';
import { MediaFile } from '~/types/image';
import MainImage from './MainImage/MainImage';
import MediaFiles from './MediaFiles/MediaFiles';
import MainSection from './MainSection/MainSection';
import SideSection from './SideSection/SideSection';
import { useApiErrorDisplay, useAppDispatch } from '~/app/hooks';
import { useHistory } from 'react-router-dom';
import { setAlert } from '~/alerts/alertSlice';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    maxWidth: 1600,
    paddingBottom: '2rem',
  },
  images: {
    marginBottom: '1rem',
  },
  media: {
    overflow: 'hidden',
  },
  secondaryInfo: {
    height: '100%',
    padding: '1rem',
    borderRadius: '.5rem',
  },
}));

interface MainFormProps {
  product?: IProductPopulated;
}

const defaultValues = {
  title: '',
  description: '',
  image: null,
  media: [],
  mediaToRemove: [],
  enable: false,
  brand: '',
  bulkDiscountEnable: false,
  color: '',
  bulkDiscountPrice: 0,
  bulkDiscountQty: 2,
  category: '',
  sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Size[],
  comparePrice: 0,
  price: 0,
  weight: 0,
  hasImage: false,
};

export type ProductFormData = {
  title: string;
  description: string;
  image: null | MediaFile;
  media: MediaFile[];
  mediaToRemove: string[];
  enable: boolean;
  brand: string;
  bulkDiscountEnable: boolean;
  color: string;
  bulkDiscountPrice: number;
  bulkDiscountQty: number;
  category: string;
  sizes: Size[];
  comparePrice: number;
  price: number;
  weight: number;
  hasImage: boolean;
};

const MainForm: FC<MainFormProps> = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [
    updateProduct,
    { isSuccess: updateSuccess, isError: updateFailed, error: updateError },
  ] = useUpdateProductMutation();
  const [
    createProduct,
    {
      isSuccess: createSuccess,
      data: newProduct,
      isError: createFailed,
      error: createError,
    },
  ] = useAddProductMutation();
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const methods = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, trigger } = methods;
  const { displayError } = useApiErrorDisplay();

  useEffect(() => {
    if (!product) return;

    const { image, media, _id, category, relatedProducts, ...rest } = product;
    reset({
      ...rest,
      hasImage: true,
      image: null,
      media: [],
      mediaToRemove: [],
      category: category?.id,
    });
    dispatch(setImage(product.image));
    dispatch(setMedia(product.media));
    dispatch(selectCategory(product.category));
  }, [product, reset, dispatch]);

  useEffect(() => {
    if (newProduct && createSuccess) {
      history.push(`/product/${newProduct._id}`);
      dispatch(setAlert('New Product has been added', 'success'));
    }
  }, [createSuccess, newProduct, dispatch, history]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(setAlert('Product has been updated', 'success'));
    }
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (updateFailed) {
      displayError(updateError);
    }
  }, [updateFailed, updateError]);

  useEffect(() => {
    if (createFailed) {
      displayError(createError);
    }
  }, [createFailed, createError]);

  const onSubmit = (values: ProductFormData) => {
    const data = { ...values };

    data.bulkDiscountEnable = Boolean(data.bulkDiscountEnable);
    data.enable = Boolean(data.enable);
    data.price = Number(data.price);
    data.weight = Number(data.weight);
    data.comparePrice = Number(data.comparePrice);
    data.bulkDiscountPrice = Number(data.bulkDiscountPrice);

    const { mediaToRemove, media, hasImage, sizes, image, ...rest } = data;
    const formData = new FormData();
    Object.entries(rest).forEach(([key, val]) => {
      formData.append(key, val);
    });
    sizes.forEach((size) => {
      formData.append('sizes[]', size);
    });
    media.forEach((file) => {
      formData.append('media', file);
    });
    if (image) {
      formData.append('image', image);
    }
    if (!product) {
      createProduct(formData);
    } else {
      if (mediaToRemove.length > 0) {
        mediaToRemove.forEach((id) => {
          formData.append('mediaToRemove[]', id);
        });
      }
      updateProduct({ data: formData, id: product._id });
    }
  };

  return (
    <>
      <CategoryModal
        onSelect={(category) => {
          dispatch(selectCategory(category));
          setValue('category', category._id, { shouldDirty: true });
          trigger('category');
        }}
        open={categoryModalOpen}
        closeHandler={() => setCategoryModalOpen(false)}
        product={product}
      />

      <Container className={classes.root} maxWidth={false}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={8}>
                <Grid container spacing={2} className={classes.images}>
                  <Grid item>
                    <MainImage />
                  </Grid>
                  <Grid item xs className={classes.media}>
                    <MediaFiles />
                  </Grid>
                </Grid>
                <MainSection />
              </Grid>
              <Grid item xs={4}>
                <SideSection
                  setCategoryModalOpen={setCategoryModalOpen}
                  product={product}
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default MainForm;
