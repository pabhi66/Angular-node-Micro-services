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
import 'rxjs/add/operator/do';

import { PayloadAction } from '../interfaces/payloadaction.interface';
import { UserService } from '../../services/user/user.service';
import * as User from '../actions/user.action';
import { AlertService } from '../../services/alert/alert.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private _userService: UserService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(User.REQ_LOGIN)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      // For each login attempt, call the userService login method
      return (
        this._userService
          .login(action.payload.username, action.payload.password)
          // Retrieve response from userService login
          .mergeMap(loginData => {
            // Call userService again to retrieve user details from the id
            return (
              this._userService
                .getById(loginData.userid)
                // Retrieve user details and call dispatch update action, and loginCompleted action
                .mergeMap(userData => {
                  return Observable.from([
                    User.updateUserDetails(
                      loginData.userid,
                      userData.username,
                      userData.first_name,
                      userData.last_name,
                      userData.email,
                    ),
                    User.loginCompleted(),
                  ]);
                })
                .catch(err => {
                  this.alertService.error('ERROR GETTING USER INFO');
                  return of(User.loginFailed());
                })
            );
          })
          .catch(err => {
            this.alertService.error(err.json().message);
            return of(User.loginFailed());
          })
      );
    });

  @Effect({ dispatch: false })
  loginComplete$: Observable<Action> = this.actions$
    .ofType(User.LOGIN_COMPLETED)
    .do(_ => this.router.navigate(['/']));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(User.REQ_LOGOUT)
    .switchMap((action: Action): ObservableInput<Action> => {
      return this._userService
        .logout()
        .switchMap(response => {
          return of(User.logoutCompleted());
        })
        .catch(err => {
          console.log('create observable: ' + err);
          return of(User.logoutFailed());
        });
    })
    .catch(err => {
      console.log('Request: ' + err);
      return of(User.logoutFailed());
    });

  @Effect({ dispatch: false })
  logoutComplete$: Observable<Action> = this.actions$
    .ofType(User.LOGOUT_COMPLETED)
    // Why are we clearing local storage here?
    .do(_ => {
      this.router.navigate(['/']);
      localStorage.clear();
    });

  // ********************************************************************************
  @Effect()
  signup$: Observable<Action> = this.actions$
    .ofType(User.REQ_SIGNUP)
    .switchMap((action: PayloadAction): ObservableInput<Action> => {
      const user = {
        uid: action.payload.username,
        psw: action.payload.password,
        first: action.payload.first_name,
        last: action.payload.last_name,
        eml: action.payload.email,
      };
      return this._userService
        .signup(user)
        .mergeMap(response => {
          return of(User.signupCompleted());
        })
        .catch(err => {
          this.alertService.error(err.json().message);
          return of(User.signupFailed());
        });
    });

  @Effect({ dispatch: false })
  signupComplete$: Observable<Action> = this.actions$
    .ofType(User.SIGNUP_COMPLETED)
    .do(_ => this.router.navigate(['login']));
}
