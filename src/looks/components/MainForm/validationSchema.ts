import * as yup from 'yup'
import { LookOrientation } from '~/types/looks'

export const schema = yup.object().shape({
    hasImage: yup.boolean(),
    image: yup.mixed().when('hasImage', {
        is: false,
        then: yup.mixed()
        .required('*Please add an image')
        .test('fileSize', 'The file is too large', (img: File) => img ? checkFileSize(img) : false)
        .test('isImageType', 'Only images are accepted', (img: File) => img ? checkIfFileIsImage(img) : false),
    }),
    enable: yup.boolean(),
    orientation: yup.string().defined().required('*Please define image orientation').oneOf(['vertical', 'horizontal']),
    items: yup.array().defined().required().min(1, '*Please add items')
}).required()

function checkFileSize(file: File): boolean {
  const size = file.size / 1024 /1024
  return size <=4
}

export function checkIfFileIsImage(file: File): boolean {
  return (file.type.split('/').shift() === 'image')
}