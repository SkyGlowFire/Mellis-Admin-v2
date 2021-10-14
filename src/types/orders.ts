import { Media } from "./image";
import { IProduct } from "./products";

export type OrderStatus = 'pending' | 'processing' | 'deliver' | 'done' | 'returned'

export interface Address{
    firstName: string
    lastName: string
    phone: number
    city: string
    streetName: string
    streetNumber: number
    apartment: number
    zip: number
    user: string
}

export interface IOrderItem{
    title: string
    size: string
    color: string
    price: number
    qty: number
    product: IProduct
}

export interface IOrder{
    _id: string
    address: Address
    user: string
    email: string
    items: IOrderItem[]
    price: number
    status: OrderStatus
    createdAt: Date
}
