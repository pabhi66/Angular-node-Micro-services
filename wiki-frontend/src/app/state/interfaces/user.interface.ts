export interface IUser {
  userid: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  loggedIn: boolean;
  loginInProgress: boolean;
  logoutInProgress: boolean;
  lastLoginFailed: boolean;
  lastLogoutFailed: boolean;

  // ****************************
  signedUp: boolean;
  signupInProgress: boolean;
}
