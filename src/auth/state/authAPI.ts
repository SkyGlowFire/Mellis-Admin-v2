import { IUser } from './authSlice';
import { LoginUserDto, SignUpUserDto } from './dto/loginUser.dto';
import axios, { AxiosResponse } from 'axios';

const API_URI = process.env.REACT_APP_API_URI

const http = axios.create({
  baseURL: API_URI,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 15000,
  withCredentials: true
});

http.interceptors.response.use(res => res, async (err) => {
  const originalConfig = err.config
    if ( err?.response?.status === 401 && !originalConfig._isRetry){
      originalConfig._isRetry = true
      try {
        await axios.get(`${API_URI}/auth/refresh`, {withCredentials: true})
        return http(originalConfig)
      } catch (error) {
        return Promise.reject(error);
      }
    }
  throw err
})

export async function fetchUser(): Promise<AxiosResponse> {
  return await http.get<IUser>('/auth/me')
}

export async function loginAPI(dto: LoginUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/auth/login-local', dto)
}

export async function registerAPI(dto: SignUpUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/auth/signup', dto)
}

export async function logOutAPI(): Promise<AxiosResponse> {
  return await http.get('/auth/logout')
}