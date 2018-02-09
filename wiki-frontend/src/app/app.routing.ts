import { RevisionsComponent } from './components/revisions/revisions.component';
import { EditarticleComponent } from './components/editarticle/editarticle.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AboutComponent } from './components/shared/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ArticleComponent } from './components/article/article.component';
import { AddArticleComponent } from './components/addarticle/addarticle.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';

// set routes
const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'profile/edit/profile', component: EditProfileComponent},
    {path: 'profile/edit/password', component: EditPasswordComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'pages/:link', component: ArticleComponent},
    {path: 'addarticle', component: AddArticleComponent},
    {path: 'pages/:title/edit', component: EditarticleComponent},
    {path: 'pages/:link/revisions/:id', component: RevisionsComponent},

    // otherwise redirect to home
    { path: '**', component: PageNotFoundComponent }
];

// export routs
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
