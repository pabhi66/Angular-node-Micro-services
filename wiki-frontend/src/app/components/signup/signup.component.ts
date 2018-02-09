import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IStore } from '../../state/interfaces/store.interface';
import { Store } from '@ngrx/store';
import { reqSignup } from '../../state/actions/user.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public user: User = new User();

  constructor(private store: Store<IStore>) {}

  signup() {
    this.store.dispatch(
      reqSignup(
        this.user.username,
        this.user.psw,
        this.user.first,
        this.user.last,
        this.user.eml,
      ),
    );
  }
}
