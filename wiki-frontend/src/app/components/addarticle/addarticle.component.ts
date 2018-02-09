import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { newPage } from '../../state/actions/page.action';


@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddArticleComponent {

  model: any = {};
  constructor(private store: Store<IStore>) {}

  add() {
    this.store.dispatch(newPage(this.model));
  }

}
