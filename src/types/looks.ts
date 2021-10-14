import { Media } from './image'
import { IProduct } from './products';

export type LookOrientation = 'horizontal' | 'vertical'

export interface ILook{
    _id: string
    orientation: LookOrientation
    enable: boolean
    image: Media
    items: string[]
}

export interface IPopulatedLook extends Omit<ILook, 'items'>{
    items: IProduct[]
}