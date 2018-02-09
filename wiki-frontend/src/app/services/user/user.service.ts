import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as constants from '../../app.constants';
import { User } from '../../models/user';
import { NOOP } from '@angular/core/src/view/util';

const loginOptions = new RequestOptions({
  withCredentials: true,
});

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getById(_id: number) {
    const url = constants.USERSURL + '/' + _id;
    return this.http.get(url, loginOptions).map(response => response.json());
  }

  login(username: string, password: string) {
    const body = `{"uid":"${username}","psw":"${password}"}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({
      headers: headers,
      withCredentials: true,
    });

    return this.http
      .post(constants.LOGINURL, body, options)
      .map(response => response.json());
  }

  logout() {
    return this.http
      .put(constants.LOGOUTURL, null, loginOptions)
      .map(response => response.json());
  }

  signup(user: any) {
    // console.log(user);
    return this.http
      .post(constants.SIGNUPURL, user)
      .map(response => response.json());
  }

  getAuthor(_id: number) {
    const url = constants.USERSURL + '/author/' + _id;
    return this.http.get(url).map(response => response.json());
  }

  updateInfo(user) {
    console.log(user);
    return this.http
      .put(constants.USERSURL + '/update/info', user, loginOptions)
      .map(res => res.json());
  }

  updatePassword(user) {
    console.log(user);
    return this.http
      .put(
        constants.USERSURL + '/update/password',
        { user: user },
        loginOptions,
      )
      .map(res => res.json());
  }
}
