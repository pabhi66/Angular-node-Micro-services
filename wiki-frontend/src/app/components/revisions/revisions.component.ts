import { UserService } from './../../services/user/user.service';
import { reqRevision } from './../../state/actions/page.action';
import { IStore } from './../../state/interfaces/store.interface';
import { Store } from '@ngrx/store';
import { IPageContent } from './../../state/interfaces/page-content.interface';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css'],
})
export class RevisionsComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  page$: Observable<IPageContent>;
  pagedata: string;
  authorName: string;
  authorID: number;
  title: String;

  constructor(
    private location: Location,
    private router: Router,
    private store: Store<IStore>,
    private _route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.page$ = this.store.select(s => s.pageReducer);
    this.page$.subscribe(page => {
      this.title = page.title;
      this.pagedata = page.pagedata;
      this.authorID = page.author;
    });
    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
  }

  ngOnInit() {
    this.showRevision();
  }

  goBack() {
    // this.router.navigateByUrl('/pages/' + this.title);
    this.location.back();
  }

  showRevision() {
    this._route.params.subscribe(params => {
      this.store.dispatch(reqRevision(params['link'], params['id']));
    });
  }
}
