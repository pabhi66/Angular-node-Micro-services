import { Action } from '@ngrx/store';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPage } from '../interfaces/page.interface';

export const UPDATE_PAGES_DETAILS = 'UPDATE_PAGES_DETAILS';
export const REQ_PAGES = 'REQ_PAGES';
export const PAGES_COMPLETED = 'PAGES_COMPLETED';
export const PAGES_FAILED = 'PAGES_FAILED';

export const updatePagesDetails = (pages: IPage[]): PayloadAction => {
  return {
    type: UPDATE_PAGES_DETAILS,
    payload: {
      pages: pages,
    }
  };
};

export const reqPages = ( ): Action => {
  return {
    type: REQ_PAGES,
  };
};

export const pagesCompleted = (): Action => {
  return {
    type: PAGES_COMPLETED,
  };
};

export const pagesFailed = (): Action => {
  return {
    type: PAGES_FAILED,
  };
};
