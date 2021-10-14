import * as yup from 'yup'

export const schema = yup.object().shape({
    email: yup.string().email('Enter valid email address').required('Email required'),
    password: yup.string().required('Password is required'),
  })