import { Reducer } from 'redux';
import { Action } from '../types';
import { getToken, setToken, removeToken } from '../../utils/cookie';
import LocalStore from '../../utils/store';

export interface UserState {
    token: string;
    realName: string;
    mobile: string;
    loginType: string;
}

const USER_KEY = 'userInfo';

const localUser = LocalStore.getValue<UserState>(USER_KEY) || {};

const defaultUser: UserState = {
    token: getToken(),
    mobile: '',
    realName: '',
    loginType: '',
    ...localUser,
};

const SET_USER_INFO = 'SET_USER_INFO';

const SET_USER_LOGOUT = 'SET_USER_LOGOUT';

export const setUserInfo: (user: UserState) => Action<UserState> = (user: UserState) => ({
    type: SET_USER_INFO,
    payload: user,
});

export const logout: () => Action<null> = () => ({
    type: SET_USER_LOGOUT,
    payload: null,
});

const userReducer: Reducer<UserState, Action<any>> = (
    state = defaultUser,
    action: Action<any>,
) => {
    const { type, payload } = action;
    console.log('action: ', action);
    switch (type) {
        case SET_USER_INFO:
            setToken(payload.token);
            LocalStore.setValue(USER_KEY, payload);
            return {
                ...payload,
            };
        case SET_USER_LOGOUT:
            removeToken();
            LocalStore.removeValue(USER_KEY);
            return {
                ...defaultUser,
            };
        default:
            return state;
    }
};

export default userReducer;
