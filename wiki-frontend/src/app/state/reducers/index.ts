import {
  combineReducers,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userReducer } from './user.reducer';
import { pagesReducer } from './pages.reducer';
import { IStore } from '../interfaces/store.interface';
import { pageReducer } from './page.reducer';
import { storeLogger } from 'ngrx-store-logger';

export const reducers: ActionReducerMap<IStore> = {
  userReducer,
  pagesReducer,
  pageReducer,
};

function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(reducers),
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}

export function logger(reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger()(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
  logger,
];
