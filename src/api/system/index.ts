import { request } from '@/axiosInterception';
import { UserState } from '@/store/module/user';

export interface UserLoginData {
    account: string;
    password: string;
}

export function apiUserLogin(data: UserLoginData) {
    console.log('data: ', data);
    return request<UserState>({
        method: 'POST',
        url: '/user/login',
        data,
    });
}

