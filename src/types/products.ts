import {ICategory} from './categories'
import { Media } from './image'

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

export interface IProduct{
    _id: string
    title: string
    enable: boolean
    description: string
    category?: string
    image: Media
    media: Media[]
    sizes: Size[]
    color: string
    brand: string
    weight: number
    path: string[]
    pathString: string
    sku: string
    relatedProducts: string[]
    price: number
    comparePrice: number
    bulkDiscountEnable: boolean
    bulkDiscountQty: number
    bulkDiscountPrice: number
}

export interface IProductPopulated extends Omit<IProduct, 'category'> {
    category?: ICategory
}