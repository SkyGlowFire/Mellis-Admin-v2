import {IProduct} from './products'

export interface ICategory{
    id: string
    _id: string
    title: string
    text: string
    level: number
    parents: ICategory[]
    children: ICategory[]
    path: string[]
    products: IProduct[]
    totalProducts: number
}