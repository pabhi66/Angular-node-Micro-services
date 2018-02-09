import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Location } from '@angular/common';
import { User } from '../../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IUser } from '../../state/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input('username') private username: string;
  // user: User;
  private email: string;
  private firstName: string;
  private lastName: string;
  private user: User;
  private userid: number;
  private returnPath: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<IStore>,
  ) {
    this.store.select(s => s.userReducer.userid).subscribe((userid: number) => {
      this.userid = userid;
    });
  }

  ngOnInit() {
    this.user = new User();
    this.route.queryParamMap // TODO check null query param
      .switchMap((params: ParamMap) => {
        const id: number = Number(params.get('id'));
        return this.userService.getById(id);
      })
      .subscribe(user => {
        this.user = user;
      });

    if (this.user.uid === undefined) {
      // TODO return to current User's profile
      this.returnPath = this.userid;
    } else {
      this.returnPath = Number.parseInt(this.user.uid);
    }

    // initialization testing
    /*
        this.user = new User;
        this.user.username = 'test username';
        this.user.email = 'test';
        this.user.firstName = 'test';
        this.user.lastName = 'test';
        */
  }

  // only submit changed fields in request body
  onSubmit(editForm: NgForm) {
    // TODO fix password logic, add error handling

    const tempUser = editForm.value;
    const enteredPassword = editForm.value.password;
    delete tempUser.password;
    const user = { user: tempUser, password: enteredPassword };
    // this.userService.updateUserData(tempUser, enteredPassword)
    // .subscribe(result => console.log(result));

    // console.log(tempUser, enteredPassword);
    this.userService.updateInfo(user).subscribe();

    this.router.navigate(['/profile/' + this.returnPath]); // TODO remove
  }

  cancelForm() {
    // this.location.back();
    this.router.navigate(['/profile/' + this.returnPath]); // TODO remove
  }

  uploadImage(fileInput: any) {
    const fileReader = new FileReader();
    // fileReader.readAsText(fileInput.files[0]);
    // console.log(fileReader.result);
    // console.log(fileInput);
    // console.log(fileInput.files[0]);
  }
}
