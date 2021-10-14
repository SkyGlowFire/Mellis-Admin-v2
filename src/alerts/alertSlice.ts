import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import * as uuid from 'uuid'
import { Dispatch } from 'react';

type alertType = 'error' | 'warning' | 'info' | 'success'

export interface IAlert{
    message: string | string[]
    type: alertType
    id: string
}

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: [] as IAlert[],
    reducers: {
        addAlert: (state, action: PayloadAction<IAlert>) => {
                state.push(action.payload)
            },
        removeAlert: (state, action: PayloadAction<String>) => state.filter(x => x.id !== action.payload)
    },
})

export const selectAlerts = (state: RootState) => state.alerts
const {removeAlert, addAlert} = alertsSlice.actions
export {removeAlert}

export const setAlert = (message: string | string[], type: alertType = 'success', timeout: number = 5) => async (dispatch: Dispatch<any>) => {
    const id = uuid.v4()
    const alert = {message, type, id}
    dispatch(addAlert(alert))
    setTimeout(() => dispatch(removeAlert(id)), timeout * 1000);
}

export default alertsSlice.reducer;