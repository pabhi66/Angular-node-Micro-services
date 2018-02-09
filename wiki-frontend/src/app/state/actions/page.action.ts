import { Action } from '@ngrx/store';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPageContent, Revisions } from '../interfaces/page-content.interface';

export const UPDATE_PAGE_DETAILS = 'UPDATE_PAGE_DETAILS';
export const UPDATE_REV_DETAILS = 'UPDATE_REV_DETAILS';
export const REQ_PAGE = 'REQ_PAGE';
export const PAGE_COMPLETED = 'PAGE_COMPLETED';
export const PAGE_FAILED = 'PAGE_FAILED';
export const NEW_PAGE = 'NEW_PAGE';
export const NEW_PAGE_COMPLETED = 'NEW_PAGE_COMPLETED';
export const NEW_PAGE_FAILED = 'NEW_PAGE_FAILED';

// ******************************************************************** */
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const EDIT_ARTICLE_COMPLETED = 'EDIT_ARTICLE_COMPLETED';
export const EDIT_ARTICLE_FAILED = 'EDIT_ARTICLE_FAILED';

// ********************************************************************
export const REQ_REVISION = 'REQ_REVISION';
export const REVISION_COMPLETED = 'REVISION_COMPLETED';
export const REVISION_FAILED = 'REVISION_FAILED';

// export const REQ_AUTHOR = 'REQ_AUTHOR';
export const GET_AUTHOR_COMPLETED = 'GET_AUTHOR_COMPLETED';
export const GET_AUTHOR_FAILED = 'GET_AUTHOR_FAILED';

export const UPDATE_AUTHOR_DETAILS = 'UPDATE_AUTHOR_DETAILS';

export const updatePageDetails = (
  title: string,
  route: string,
  shortRoute: string,
  description: string,
  revisionid: number,
  modified: Date,
  author: number,
  pagedata: string,
  revisions: Revisions[],
): PayloadAction => {
  return {
    type: UPDATE_PAGE_DETAILS,
    payload: {
      title,
      route,
      shortRoute,
      description,
      revisionid,
      modified,
      author,
      pagedata,
      revisions,
    },
  };
};

export const updatePageRevDetails = (
  title: string,
  route: string,
  shortRoute: string,
  modified: Date,
  author: number,
  pagedata: string,
): PayloadAction => {
  return {
    type: UPDATE_REV_DETAILS,
    payload: {
      title,
      route,
      shortRoute,
      modified,
      author,
      pagedata,
    },
  };
};

export const updateAuthorDetails = (
  authorFirstName: string,
  authorLastName: string,
): PayloadAction => {
  return {
    type: UPDATE_AUTHOR_DETAILS,
    payload: {
      authorFirstName,
      authorLastName,
    },
  };
};

export const reqPage = (shortRoute: string): PayloadAction => {
  return {
    type: REQ_PAGE,
    payload: {
      shortRoute: shortRoute,
    },
  };
};

export const pageCompleted = (userid: number): PayloadAction => {
  return {
    type: PAGE_COMPLETED,
    payload: {
      userid: userid,
    },
  };
};

export const pageFailed = (): Action => {
  return {
    type: PAGE_FAILED,
  };
};

export const newPage = (title: string): PayloadAction => {
  return {
    type: NEW_PAGE,
    payload: {
      title,
    },
  };
};

export const newPageCompleted = (newPageRoute: string): PayloadAction => {
  return {
    type: NEW_PAGE_COMPLETED,
    payload: {
      newPageRoute,
    },
  };
};

export const newPageFailed = (): Action => {
  return {
    type: NEW_PAGE_FAILED,
  };
};

// ****************************************************************************** */

export const editArticle = (
  shortRoute: string,
  pagedata: string,
): PayloadAction => {
  return {
    type: EDIT_ARTICLE,
    payload: {
      shortRoute,
      pagedata,
    },
  };
};

export const editArticleCompleted = (pagedata: string): PayloadAction => {
  return {
    type: EDIT_ARTICLE_COMPLETED,
    payload: {
      pagedata,
    },
  };
};

export const editArticleFailed = (): Action => {
  return {
    type: EDIT_ARTICLE_FAILED,
  };
};

// ***************************************************************************
export const reqRevision = (
  shortRoute: string,
  revisionid: string,
): PayloadAction => {
  return {
    type: REQ_REVISION,
    payload: {
      shortRoute,
      revisionid,
    },
  };
};

export const revisionCompleted = (): Action => {
  return {
    type: REVISION_COMPLETED,
  };
};

export const revisionFailed = (): Action => {
  return {
    type: REVISION_FAILED,
  };
};

export const getAuthorCompleted = (): Action => {
  return {
    type: GET_AUTHOR_COMPLETED,
  };
};

export const getAuthorFailed = (): Action => {
  return {
    type: GET_AUTHOR_FAILED,
  };
};
