import { IPageContent } from './../../state/interfaces/page-content.interface';
import { Observable } from 'rxjs/Observable';
import { reqPage } from './../../state/actions/page.action';
import { ActivatedRoute } from '@angular/router';
import { IStore } from './../../state/interfaces/store.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { editArticle } from '../../state/actions/page.action';
import { IPage } from '../../state/interfaces/page.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css'],
})
export class EditarticleComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  page$: Observable<IPageContent>;
  model: any = {};
  editorContent: string;
  title: string;
  pageid: string;

  constructor(
    private store: Store<IStore>,
    private _route: ActivatedRoute,
    private location: Location,
  ) {
    this.page$ = this.store.select(s => s.pageReducer);
    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
  }

  ngOnInit() {
    this._route.params.map(p => p.title).subscribe(link => {
      this.store.dispatch(reqPage(link));
      setTimeout(() => {
        this.page$.subscribe(result => {
          this.editorContent = result.pagedata;
          this.title = result.title;
          this.pageid = result.shortRoute;
        });
      }, 500);
    });
  }

  edit() {
    console.log(this.pageid);
    this.store.dispatch(editArticle(this.pageid, this.editorContent));
  }
  goBack() {
    this.location.back();
  }
}
