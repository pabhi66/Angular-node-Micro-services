import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  StoreModule,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './state/reducers';
import { UserEffects } from './state/effects/user.effect';
import { PagesEffects } from './state/effects/pages.effect';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { PageService } from './services/page/page.service';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AboutComponent } from './components/shared/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { IStore } from './state/interfaces/store.interface';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { ArticleComponent } from './components/article/article.component';
import { PageEffects } from './state/effects/page.effect';
import { AddArticleComponent } from './components/addarticle/addarticle.component';
import { EditarticleComponent } from './components/editarticle/editarticle.component';
import { RevisionsComponent } from './components/revisions/revisions.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert/alert.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchService } from './services/search/search.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPasswordComponent,
    ArticleComponent,
    AddArticleComponent,
    EditarticleComponent,
    RevisionsComponent,
    AlertComponent,
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, //  Retains last 25 states
    }),
    RoutingModule,
    EffectsModule.forRoot([UserEffects, PagesEffects, PageEffects]),
    Ng2SearchPipeModule,
  ],
  providers: [UserService, PageService, AlertService, SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
