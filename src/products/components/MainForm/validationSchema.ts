import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required('*Title required')
  .matches(/^([\w -]*)$/, 'Title can include only characters, spaces and "-", "/" symbols'),
  category: yup.string().required('*Please assign category').defined(),
  description: yup.string().matches(/^(|.{10,500})$/, "*Description text must be between 10-500 characters"),
  hasImage: yup.boolean(),
  image: yup.mixed().when('hasImage', {
    is: false,
    then: yup.mixed().required('*Please add an image')
    .test('fileSize', 'The file is too large', (img: File) => img ? checkIfFilesAreTooBig([img]) : false)
    .test('isImageType', 'Only images are accepted', (img: File) => img ? checkIfFilesAreImages([img]) : false),
  }),
  media: yup.array().of(yup.mixed())
  .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
  .test('isImageType', 'Only images are accepted', checkIfFilesAreImages),
  mediaToRemove: yup.array().of(yup.string()),
  brand: yup.string().nullable().required('*Please choose product brand'),
  color: yup.string().required('*Please choose color'),
  weight: yup.number().transform(value => isNaN(value) ? undefined : value)
  .required("Insert product weight")
  .min(1, "Insert product weight"),
  bulkDiscountEnable: yup.boolean(),
  bulkDiscountQty: yup.number(),
  bulkDiscountPrice: yup.number()
  .transform((v, o) => o === '' ? null : v).nullable()
  .when('bulkDiscountEnable', {
      is: true,
      then: yup.number()
      .transform((v, o) => o === '' ? null : v).nullable()
      .required('*Price required')
      .min(1, 'Price required')
      .test('', 'Bulk price must be less than price',
      function(val){
          let price = this.parent.price;
          if(val && price && Number(price) < Number(val))
             return false;
            else
              return true;
        }),
    }),
  enable: yup.boolean(),
  price: yup.number()
  .transform((v, o) => o === '' ? null : v).nullable().required('*Please add a price')
    .min(1, '*Price required'),
  comparePrice: yup.number()
  .transform((v, o) => o === '' ? null : v).nullable()
  .test('', 'Compare price must be greater than price',
  function(value) {
  let price = this.parent.price
   if(value && price && Number(price) > Number(value))
        return false;
   else
        return true;
   }),
   sizes: yup.array().required()
   .min(1, 'You must choose at least 1 size')
   .of(yup.string().oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']))
}).required()

function checkIfFilesAreTooBig(files?: File[]): boolean {
  if (files) {
    files.forEach(file => {
      const size = file.size / 1024 /1024
      if (size > 4) {
        return false
      }
    })
  }
  return true
}

export function checkIfFilesAreImages(files?: File[]): boolean {
  if (files) {
    files.forEach(file => {
      if (file.type.split('/').shift() !== 'image') {
        return false
      }
    })
  }
  return true
}