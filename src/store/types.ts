import { UserState } from './module/user';

export interface StoreState {
  user: UserState;
}
export interface IAction<T> {
  type: string;
  payload: T;
}
