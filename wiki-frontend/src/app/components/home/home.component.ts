import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IPage } from '../../state/interfaces/page.interface';
import { reqPages } from '../../state/actions/pages.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  firstName$: Observable<string>;
  pages$: Observable<IPage[]>;

  constructor(private store: Store<IStore>) {
    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
    this.firstName$ = this.store.select(s => s.userReducer.first_name);
    this.pages$ = this.store.select(s => s.pagesReducer.pages);
  }

  ngOnInit() {
    this.store.dispatch(reqPages());
  }
}
