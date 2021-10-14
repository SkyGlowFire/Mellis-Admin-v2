import { Size } from "~/types/products"

export interface CreateProductDto{
    image: File | null
    media: File[]
    title: string
    enable: boolean
    description: string
    category: string
    color: string
    weight: number
    sku?: string
    price: number
    sizes?: Size[]
    bulkDiscountEnable: boolean
    bulkDiscountQty?: number
    bulkDiscountPrice?: number
}