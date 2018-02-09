import { PAGE_COMPLETED } from './../actions/page.action';
import * as Page from '../actions/page.action';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { Action } from '@ngrx/store';
import { IPageContent } from '../interfaces/page-content.interface';

const storeInitialState: IPageContent = {
  title: undefined,
  route: undefined,
  shortRoute: undefined,
  description: undefined,
  revisionid: undefined,
  modified: undefined,
  author: undefined,
  pagedata: undefined,
  revisions: [],
  getPageContentInProgress: false,
  getPageContentFailed: false,
  createPageFailed: false,
  createPageInProgress: false,
  newPageRoute: undefined,

  // **********************************
  editArticleInProgress: false,
  editArticleFailed: false,

  // **********************************
  getRevisionInProgress: false,
  getRevisionFailed: false,

  getAuthorInProgress: false,
  getAuthorCompleted: false,

  authorLastName: undefined,
  authorFirstName: undefined,
};

export function pageReducer(
  state: IPageContent = storeInitialState,
  action: PayloadAction,
): IPageContent {
  if (action.type === Page.UPDATE_PAGE_DETAILS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === Page.UPDATE_REV_DETAILS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === Page.UPDATE_AUTHOR_DETAILS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === Page.REQ_PAGE) {
    return Object.assign({}, state, action.payload, {
      getPageContentInProgress: true,
    });
  }

  if (action.type === Page.PAGE_COMPLETED) {
    return Object.assign({}, state, action.payload, {
      getPageContentInProgress: false,
      getPageContentFailed: false,
      getAuthorInProgress: true,
    });
  }

  if (action.type === Page.PAGE_FAILED) {
    return Object.assign({}, state, {
      getPageContentInProgress: false,
      getPageContentFailed: true,
    });
  }

  if (action.type === Page.NEW_PAGE) {
    return Object.assign({}, state, action.payload, {
      createPageInProgress: true,
    });
  }

  if (action.type === Page.NEW_PAGE_COMPLETED) {
    return Object.assign({}, state, action.payload, {
      createPageInProgress: false,
      createPageFailed: false,
    });
  }

  if (action.type === Page.NEW_PAGE_FAILED) {
    return Object.assign({}, state, {
      createPageInProgress: false,
      createPageFailed: true,
    });
  }

  // *******************************************************
  if (action.type === Page.EDIT_ARTICLE) {
    return Object.assign({}, state, action.payload, {
      editArtcleInProgress: true,
    });
  }

  if (action.type === Page.EDIT_ARTICLE_COMPLETED) {
    return Object.assign({}, state, action.payload, {
      editArticleInProgress: false,
      editArticleFailed: false,
    });
  }

  if (action.type === Page.EDIT_ARTICLE_FAILED) {
    return Object.assign({}, state, {
      editArticleInProgress: false,
      editArticleFailed: true,
    });
  }

  // ***********************************************************
  if (action.type === Page.REQ_REVISION) {
    return Object.assign({}, state, action.payload, {
      getRevisionInProgress: true,
    });
  }

  if (action.type === Page.REVISION_COMPLETED) {
    return Object.assign({}, state, action.payload, {
      getRevisionFailed: false,
      getRevisionInProgress: false,
    });
  }

  if (action.type === Page.REVISION_FAILED) {
    return Object.assign({}, state, {
      getRevisionFailed: true,
      getRevisionInProgress: false,
    });
  }

  if (action.type === Page.GET_AUTHOR_COMPLETED) {
    return Object.assign({}, state, {
      getAuthorInProgress: false,
      getAuthorCompleted: true,
    });
  }

  if (action.type === Page.GET_AUTHOR_FAILED) {
    return Object.assign({}, state, {
      getAuthorInProgress: false,
      getAuthorCompleted: false,
    });
  }

  return state;
}
