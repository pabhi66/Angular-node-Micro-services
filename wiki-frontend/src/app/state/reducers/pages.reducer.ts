import * as Pages from '../actions/pages.action';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPages } from '../interfaces/pages.interface';
import { IPage } from '../interfaces/page.interface';
import { Action } from '@ngrx/store';

const storeInitialState: IPages = {
  pages: [],
  getPagesInProgress: false,
  getPagesFailed: false,
};


export function pagesReducer(state: IPages = storeInitialState, action: PayloadAction): IPages {
  if (action.type === Pages.UPDATE_PAGES_DETAILS) {
    return Object.assign(
      {},
      state,
      action.payload,
    );
  }

  if (action.type === Pages.REQ_PAGES) {
    return Object.assign(
      {},
      state,
      {getPagesInProgress: true}
    );
  }

  if (action.type === Pages.PAGES_COMPLETED) {
    return Object.assign(
      {},
      state,
      action.payload,
      {getPagesInProgress: false, getPagesFailed: false}
    );
  }

  if (action.type === Pages.PAGES_FAILED) {
    return Object.assign(
      {},
      state,
      {getPagesInProgress: false, getPagesFailed: true}
    );
  }

  return state;

}
