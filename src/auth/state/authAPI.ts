import { IUser } from './authSlice';
import { LoginUserDto, SignUpUserDto } from './dto/loginUser.dto';
import { http } from '../../app/api';
import { AxiosResponse } from 'axios';

export async function fetchUser(): Promise<AxiosResponse> {
  return await http.get<IUser>('/auth/me')
}

export async function loginAPI(dto: LoginUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/auth/login-local', dto)
}

export async function registerAPI(dto: SignUpUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/users', dto)
}

export async function logOutAPI(): Promise<AxiosResponse> {
  return await http.get('/auth/logout')
}