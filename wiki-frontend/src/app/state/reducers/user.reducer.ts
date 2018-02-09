import * as User from '../actions/user.action';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IUser } from '../interfaces/user.interface';
import { Action } from '@ngrx/store';

const storeInitialState: IUser = {
  userid: undefined,
  first_name: undefined,
  last_name: undefined,
  username: undefined,
  email: undefined,
  loggedIn: false,
  loginInProgress: false,
  logoutInProgress: false,
  lastLoginFailed: false,
  lastLogoutFailed: false,

  // **************************
  signupInProgress: false,
  signedUp: false,
};

export function userReducer(
  state: IUser = storeInitialState,
  action: PayloadAction,
): IUser {
  if (action.type === User.UPDATE_USER_DETAILS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === User.REQ_LOGIN) {
    return Object.assign({}, state, action.payload, { loginInProgress: true });
  }

  if (action.type === User.LOGIN_COMPLETED) {
    return Object.assign({}, state, {
      loginInProgress: false,
      lastLoginFailed: false,
      loggedIn: true,
      password: undefined,
    });
  }

  if (action.type === User.LOGIN_FAILED) {
    return Object.assign({}, state, {
      loginInProgress: false,
      lastLoginFailed: true,
      loggedIn: false,
      password: undefined,
    });
  }

  if (action.type === User.REQ_LOGOUT) {
    return Object.assign({}, state, action.payload, { logoutInProgress: true });
  }

  if (action.type === User.LOGOUT_COMPLETED) {
    return Object.assign({}, storeInitialState);
  }

  if (action.type === User.LOGOUT_FAILED) {
    return Object.assign({}, state, {
      logoutInProgress: false,
      lastLogoutFailed: true,
    });
  }

  // *************************************************************************************************
  if (action.type === User.REQ_SIGNUP) {
    return Object.assign({}, state, action.payload, { signupInProgress: true });
  }

  if (action.type === User.SIGNUP_COMPLETED) {
    return Object.assign({}, state, {
      signedUp: true,
      signupInProgress: false,
      password: undefined,
    });
  }

  if (action.type === User.SIGNUP_FAILED) {
    return Object.assign({}, state, {
      signupInProgress: false,
      signedUp: false,
      password: undefined,
    });
  }

  return state;
}
