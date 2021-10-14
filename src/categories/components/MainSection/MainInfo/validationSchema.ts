import * as yup from 'yup'

export const schema = yup.object().shape({
    title: yup.string().required('Title required').min(3),
    text: yup.string().matches(/^(|.{15,60})$/, "Description text must be between 15-60 characters").defined(),
  }).required()

  export type CategorySchema = yup.InferType<typeof schema>