import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  ICategoryTreeItem } from '~/types/categories';
import { Media } from '~/types/image';

interface ProductState{
    image: Media | null
    media: Media[]
    category: ICategoryTreeItem | null | undefined
}

const initialState: ProductState = {
    image: null,
    media: [],
    category: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<Media | null>) => {
            state.image = action.payload
        },
        setMedia: (state, action: PayloadAction<Media[]>) => {
            state.media = action.payload
        },
        addMedia: (state, action: PayloadAction<Media[]>) => {
            state.media = state.media.concat(action.payload)
        },
        deleteMedia: (state, action: PayloadAction<string>) => {
            state.media = state.media.filter(file => file._id !== action.payload)
        },
        selectCategory: (state, action: PayloadAction<ICategoryTreeItem | undefined>) => {
            state.category = action.payload
        },
        clearProduct: () => initialState
    },
})

export const {setImage, setMedia, addMedia, deleteMedia, selectCategory, clearProduct} = productSlice.actions
export default productSlice.reducer;