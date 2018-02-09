import { IPage } from './page.interface';

export interface Revisions {
  route: string;
  RevisionId: number;
}

export interface IPageContent extends IPage {
  revisionid: number;
  modified: Date;
  author: number;
  authorLastName: string;
  authorFirstName: string;
  pagedata: string;
  revisions: Revisions[];
  getPageContentInProgress: boolean;
  getPageContentFailed: boolean;
  createPageInProgress: boolean;
  createPageFailed: boolean;
  newPageRoute: string;

  // ***********************************
  editArticleInProgress: boolean;
  editArticleFailed: boolean;

  // **********************************
  getRevisionInProgress: boolean;
  getRevisionFailed: boolean;

  getAuthorInProgress: boolean;
  getAuthorCompleted: boolean;
}
