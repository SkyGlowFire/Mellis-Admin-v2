import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media } from '~/types/image';

interface LookState{
    image: Media | null
}

const initialState: LookState = {
    image: null,
}

export const lookSlice = createSlice({
    name: 'look',
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<Media | null>) => {
            state.image = action.payload
        },
        clearImage: (state) => {
            state.image = null
        }
    },
})

export const {setImage, clearImage} = lookSlice.actions
export default lookSlice.reducer;