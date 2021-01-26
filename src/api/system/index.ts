import { request } from '@/interception';
import { UserState } from '@/store/module/user';

export interface UserLoginData {
    account: string;
    password: string;
}

export function apiUserLogin(data: UserLoginData) {
    return request<UserState>({
        method: 'POST',
        url: '/user/login',
        data,
    });
}

