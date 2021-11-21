import * as yup from 'yup'

export const schema = yup.object().shape({
    title: yup.string().required('Title required').min(3),
    text: yup.string().notRequired()
    .when('text', {
      is: (val: string) => val?.length,
      then: rule => rule
      .min(15, "Description text must be between 15-700 characters")
      .max(700, "Description text must be between 15-700 characters")
      .matches(/^([\w ./-]*)$/, "Description text can contain only letters, digits, spaces, and -/. symbols"),
    })
  }, [['text', 'text']]).required()

  export type CategorySchema = yup.InferType<typeof schema>