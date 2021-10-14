import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, loginAPI, registerAPI } from './authAPI';
import { RootState } from '../../app/store';
import { LoginUserDto, SignUpUserDto } from './dto/loginUser.dto';
import { AxiosError} from 'axios';

export type Role = 'admin' | 'editor' | 'customer'

export const getUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, {rejectWithValue}) => {
     try {
      const res = await fetchUser()
      return res.data
    } catch (error) {
      const err = error as AxiosError   
      return rejectWithValue(err.response)
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (dto: LoginUserDto, {rejectWithValue, dispatch}) => {
    try {
      await loginAPI(dto)
      return dispatch(getUser())
    } catch (error) {
      const err = error as AxiosError    
      return rejectWithValue(err.response?.data)
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (dto: SignUpUserDto, {rejectWithValue, dispatch}) => {
    try {
      await registerAPI(dto)
      return dispatch(getUser())
    } catch (error) {
      const err = error as AxiosError    
      return rejectWithValue(err.response?.data)
    }
  }
);

export interface IUser{
    email: string
    username: string
    role: Role
    firstName: string
    lastName: string
}

interface AuthState{
    isAuth: boolean
    user: IUser | null
    loading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isAuth = false
            state.user = null
        },
    },
    extraReducers: builder => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(signUp.pending, (state) => {
            state.loading = true
        })
        .addCase(getUser.pending, (state) => {
            state.loading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        })
        .addCase(getUser.rejected, (state) => {
            state.loading = false
            state.isAuth = false
            state.user = null
        })
    }
})

export const {clearUser} = authSlice.actions
export const getMe = (state: RootState) => state.auth.user
export default authSlice.reducer;