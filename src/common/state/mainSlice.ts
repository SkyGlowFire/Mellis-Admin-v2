import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';

const isPendingAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/pending");
};

const isFulfilledAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/fulfilled");
};

const isRejectedAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/rejected");
};

type ResponseError = {
    message: string | string[]
    status?: number
}

interface MainState{
    loading: boolean
    error: ResponseError | null
    imageModal: {
        open: boolean,
        url: string
    }
}

const initialState: MainState = {
    loading: false,
    error: null,
    imageModal: {
        open: false,
        url: ''
    }
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        openImageModal(state, action: PayloadAction<string>){
            state.imageModal = {open: true, url: action.payload}
        },
        closeImageModal(state){
            state.imageModal = {open: false, url: ''}
        }
    },
    extraReducers: builder => {
        builder
        .addMatcher(isPendingAction, state => {
            state.loading = true;
            state.error = null;
        })
        .addMatcher(isFulfilledAction, state => {
            state.loading = false;
            
        })
        .addMatcher(isRejectedAction, (state, action: AnyAction) => {
            console.log('action ', action)
            const {payload} = action
            state.loading = false;
            if(payload){
                if(payload.status === 500){
                    state.error = {message: 'Internal server error', status: 500}
                } else if(payload.data){
                    state.error = {message: payload.data.message, status: payload.status}
                } else {
                    state.error = {message: payload?.message, status: payload.status}
                }
            } else if(action.error?.name !== 'ConditionError'){
                state.error = {message: 'server does not response'}
            }   
        })
    }
})

export const {closeImageModal, openImageModal} = mainSlice.actions

export default mainSlice.reducer;