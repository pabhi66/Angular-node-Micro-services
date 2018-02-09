import { Action } from '@ngrx/store';
import { PayloadAction } from '../interfaces/payloadaction.interface';

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const REQ_LOGIN = 'REQ_LOGIN';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REQ_LOGOUT = 'REQ_LOGOUT';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

// ********************************************
export const REQ_SIGNUP = 'REQ_SIGNUP';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const updateUserDetails = (
  userid: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
): PayloadAction => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      userid: userid,
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  };
};

export const reqLogin = (username: string, password: string): PayloadAction => {
  return {
    type: REQ_LOGIN,
    payload: {
      username: username,
      password: password,
    },
  };
};

export const loginCompleted = (): Action => {
  return {
    type: LOGIN_COMPLETED,
  };
};

export const loginFailed = (): Action => {
  return {
    type: LOGIN_FAILED,
  };
};

export const reqLogout = (): Action => {
  return {
    type: REQ_LOGOUT,
  };
};

export const logoutCompleted = (): Action => {
  return {
    type: LOGOUT_COMPLETED,
  };
};

export const logoutFailed = (): Action => {
  return {
    type: LOGOUT_FAILED,
  };
};

// *************************************************************************
export const reqSignup = (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string,
): PayloadAction => {
  return {
    type: REQ_SIGNUP,
    payload: {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
  };
};

export const signupCompleted = (): Action => {
  return {
    type: SIGNUP_COMPLETED,
  };
};

export const signupFailed = (): Action => {
  return {
    type: SIGNUP_FAILED,
  };
};
