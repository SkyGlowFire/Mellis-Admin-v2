export interface CreateCategoryDto{
    title: string
    text: string | null
    parentId?: null | string
}

export interface UpdateCategoryDto{
    id: string
    title: string
    text: string | null
}