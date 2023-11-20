import { Prisma } from '@tpoai/data-commons';
import axios from 'axios';

export async function UsersLoginRequest(data: Prisma.UserUncheckedCreateInput) {
  return axios.post('users/login', data);
}

export async function GetUserRequest() {
  return axios.get('users');
}

export async function RegistgerUserRequest(data: Prisma.UserCreateInput) {
  return axios.post('users/register', data);
}
