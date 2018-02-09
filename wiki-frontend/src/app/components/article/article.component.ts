import { pageCompleted, reqPage } from './../../state/actions/page.action';
import { IUser } from './../../state/interfaces/user.interface';
import { UserService } from './../../services/user/user.service';
import { Revisions } from './../../state/interfaces/page-content.interface';
import { IPage } from './../../state/interfaces/page.interface';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { Observable } from 'rxjs/Observable';
import { IPageContent } from '../../state/interfaces/page-content.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  route: any;
  loggedIn$: Observable<boolean>;
  page$: Observable<IPageContent>;
  author: string;
  pagedata: string;
  authorID: number;
  authorName: string;
  sampeldata: string;

  constructor(
    private store: Store<IStore>,
    private _route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.page$ = this.store.select(s => s.pageReducer);
    this.page$.subscribe(page => {
      this.pagedata = page.pagedata;
      this.route = page.revisions;
      this.authorID = page.author;
    });

    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
  }

  ngOnInit() {
    this.sampeldata = 'Edit this article';
    this._route.params.map(p => p.link).subscribe(link => {
      this.store.dispatch(reqPage(link));
    });
  }
}
