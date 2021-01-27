import { UserState } from './module/user';
import { Settings } from './module/settings';

export interface StoreState {
  user: UserState;
  settings: Settings;
}
export interface Action<T> {
  type: string;
  payload: T;
}
