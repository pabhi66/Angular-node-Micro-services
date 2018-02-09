import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { reqLogout } from '../../state/actions/user.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private store: Store<IStore> ) { }

  ngOnInit() {
    this.store.dispatch(reqLogout());
  }

}
