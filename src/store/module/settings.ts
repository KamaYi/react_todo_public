import { Reducer } from 'redux';
import { Action } from '../types';
import LocalStore from '../../utils/store';

export interface Settings {
    collapsed: boolean; // 是否折叠
    defaultSelectedKeys: string;
    defaultOpenKeys: Array<string>;
}

const SETTINGS_KEY = 'settings';

const localSettings = LocalStore.getValue<Settings>(SETTINGS_KEY) || {};

const defaults: Settings = {
    collapsed: false,
    defaultSelectedKeys: '',
    defaultOpenKeys: [],
    ...localSettings,
};

const UPDATE_SETTINSG = 'UPDATE_SETTINSG';

export const updateSettings: (settings: Settings) => Action<Settings> = (
    settings: Settings,
) => ({
    type: UPDATE_SETTINSG,
    payload: settings,
});

const settingsReducer: Reducer<Settings, Action<any>> = (
    state = defaults,
    action: Action<any>,
) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_SETTINSG:
            LocalStore.setValue(SETTINGS_KEY, payload as Settings);
            return {
                ...payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default settingsReducer;
