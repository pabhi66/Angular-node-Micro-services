import { Injectable } from '@angular/core';

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
import { PageService } from '../../services/page/page.service';
import * as Pages from '../actions/pages.action';

@Injectable()
export class PagesEffects {
  constructor(private actions$: Actions, private _pageService: PageService) {}

  @Effect()
  reqPages$: Observable<Action> = this.actions$
    .ofType(Pages.REQ_PAGES)
    .switchMap((action: Action): ObservableInput<Action> => {
      return this._pageService
        .getAll()
        .mergeMap(pagesData => {
          //   console.log(pagesData);
          return Observable.from([
            Pages.updatePagesDetails(
              pagesData.map(page => {
                // console.log(page);
                return Object.assign(page, {
                  //   shortRoute: page.route.split('/').reverse()[0],
                  shortRoute: page.route,
                  description: page.description,
                });
              }),
            ),
            Pages.pagesCompleted(),
          ]);
        })
        .catch(err => {
          return of(Pages.pagesFailed());
        });
    });
}
