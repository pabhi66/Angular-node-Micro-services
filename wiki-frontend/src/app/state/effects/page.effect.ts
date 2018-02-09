import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

import { PayloadAction } from '../interfaces/payloadaction.interface';
import { AlertService } from './../../services/alert/alert.service';
import { PageService } from '../../services/page/page.service';
import { UserService } from '../../services/user/user.service';
import * as Page from '../actions/page.action';
import * as constants from '../../app.constants';
import { newPage } from '../actions/page.action';

@Injectable()
export class PageEffects {
  constructor(
    private actions$: Actions,
    private _pageService: PageService,
    private _userService: UserService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  @Effect()
  reqPage$: Observable<Action> = this.actions$
    .ofType(Page.REQ_PAGE)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      return this._pageService
        .getById(action.payload.shortRoute)
        .mergeMap(pageData => {
          // console.log(pageData);
          return Observable.from([
            Page.updatePageDetails(
              pageData[0].title,
              constants.PAGESURL + '/' + action.payload.shortRoute,
              action.payload.shortRoute,
              action.payload.description,
              pageData[0].revisionid,
              pageData[0].modified,
              pageData[0].author,
              pageData[0].pagedata,
              pageData[0].revisions.route,
            ),
            Page.pageCompleted(pageData[0].author),
          ]);
        })
        .catch(err => {
          return of(Page.pageFailed());
        });
    });

  // *******************************************************************************
  @Effect()
  pageCompleted$: Observable<Action> = this.actions$
    .ofType(Page.PAGE_COMPLETED)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      return this._userService
        .getAuthor(action.payload.userid)
        .mergeMap(AuthorData => {
          // console.log(AuthorData);
          return Observable.from([
            Page.updateAuthorDetails(
              AuthorData.first_name,
              AuthorData.last_name,
            ),
            Page.getAuthorCompleted(),
          ]);
        })
        .catch(err => {
          console.log(err);
          return of(Page.getAuthorFailed());
        });
    });

  @Effect()
  newPage$: Observable<Action> = this.actions$
    .ofType(Page.NEW_PAGE)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      return this._pageService
        .addArticle(action.payload.title)
        .mergeMap(newPageData => {
          console.log(newPageData);
          return of(Page.newPageCompleted(newPageData.msg));
        })
        .catch(err => {
          // console.log(err);
          this.alertService.error(err.statusText);
          return of(Page.newPageFailed());
        });
    });

  @Effect({ dispatch: false })
  newPageComplete$: Observable<Action> = this.actions$
    .ofType(Page.NEW_PAGE_COMPLETED)
    .do((action: PayloadAction) =>
      this.router.navigate([
        'pages',
        action.payload.newPageRoute.split('/').reverse()[0],
      ]),
    );

  // ***********************************************************************************************

  @Effect()
  editArticle$: Observable<Action> = this.actions$
    .ofType(Page.EDIT_ARTICLE)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      console.log('We here:' + action.payload);
      console.log('-------------------' + action.payload.shortRoute);
      return this._pageService
        .editArticle(action.payload.shortRoute, action.payload.pagedata)
        .mergeMap(articleData => {
          console.log(articleData.pageid);
          return of(Page.editArticleCompleted(articleData.content));
        })
        .catch(err => {
          this.alertService.error(err.json().msg);
          return of(Page.editArticleFailed());
        });
    });

  @Effect({ dispatch: false })
  editArticleCompleted$: Observable<Action> = this.actions$
    .ofType(Page.EDIT_ARTICLE_COMPLETED)
    .do((action: PayloadAction) => this.router.navigate(['/']));

  // *************************************************************************************************
  @Effect()
  reqRevision$: Observable<Action> = this.actions$
    .ofType(Page.REQ_REVISION)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      return this._pageService
        .getRevision(action.payload.shortRoute, action.payload.revisionid)
        .mergeMap(pageData => {
          // console.log(pageData);
          return Observable.from([
            Page.updatePageRevDetails(
              pageData[0].title,
              constants.PAGESURL +
                '/' +
                action.payload.shortRoute +
                '/revisions/' +
                action.payload.revisionid,
              action.payload.shortRoute,
              pageData[0].modified,
              pageData[0].author,
              pageData[0].pagedata,
            ),
            Page.revisionCompleted(),
            Page.pageCompleted(pageData[0].author),
          ]);
        })
        .catch(err => {
          return of(Page.revisionFailed());
        });
    });
}
