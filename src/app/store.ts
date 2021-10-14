import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import {History} from 'history'
import alertsReducer from '../alerts/alertSlice';
import mainReducer from '../common/state/mainSlice';
import authReducer from '../auth/state/authSlice';
import productReducer from '../products/state/productSlice';
import lookReducer from '../looks/state/lookSlice';
import {createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {Api} from './api'

export const history = createBrowserHistory()

const createRootReducer = (history:History<any>) => combineReducers({
  alerts: alertsReducer,
  main: mainReducer,
  auth: authReducer,
  product: productReducer,
  look: lookReducer,
  [Api.reducerPath]: Api.reducer,
  router: connectRouter(history)
})

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(routerMiddleware(history))
    .concat(Api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)