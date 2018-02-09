import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IUser } from '../../state/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  userid: number;
  username = 'Username';
  profileImagePath = 'path';
  lastActivity = 'test_date';
  recentActivity = ['test activity1', 'test activity2'];
  canEditProfile: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<IStore>,
  ) {
    this.store.select(s => s.userReducer.userid).subscribe((userid: number) => {
      this.userid = userid;
    });
  }

  ngOnInit() {
    this.user = new User();
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id: number = Number(params.get('id'));
        return this.userService.getById(id);
      })
      .subscribe(user => {
        this.user = user;
        this.canEditProfile = this.checkUserId();
      });
    // console.log(this.user);
    // initialization testing
    /*
      this.user = new User;
      this.user.firstName = 'test name';
      this.user.lastName = 'test last name';
      this.user.email = 'test email';
      */
  }

  goToEditProfile() {
    this.router.navigate(['profile/edit/profile'], {
      queryParams: { id: this.userid },
    });
  }

  goToEditPassword() {
    this.router.navigate(['profile/edit/password'], {
      queryParams: { id: this.user.uid },
    });
  }

  findUser(id: number) {
    this.userService.getById(id).subscribe(user => (this.user = user));
  }

  checkUserId() {
    const currentProfileId = Number.parseInt(this.route.snapshot.params['id']);
    // console.log(currentProfileId, this.userid);
    return currentProfileId === this.userid;
  }
}
