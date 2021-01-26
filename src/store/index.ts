import { createStore, combineReducers, applyMiddleware, compose, Middleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { StoreState, IAction } from './types';
import userReducer from './module/user';

const reducers: Reducer<StoreState, IAction<any>> = combineReducers<StoreState>({
  user: userReducer
});

const middleware: Middleware[] = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(reduxLogger);
}

function createMyStore() {
  /* eslint-disable no-underscore-dangle */
  const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducers,
        compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
      )
    : createStore(reducers, applyMiddleware(...middleware));

  return store;
}

const store = createMyStore();

export default store;
