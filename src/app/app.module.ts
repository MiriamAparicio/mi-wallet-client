
/** angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/** pages */
import { AppComponent } from './app.component';
import { HomeLoginPageComponent } from './pages/home-login-page/home-login-page.component';
import { HomeSignupPageComponent } from './pages/home-signup-page/home-signup-page.component';
import { AccountsOverviewPageComponent } from './pages/accounts/accounts-overview-page/accounts-overview-page.component';
import { AccountDetailPageComponent } from './pages/accounts/account-detail-page/account-detail-page.component';
import { AccountCreatePageComponent } from './pages/accounts/account-create-page/account-create-page.component';
import { RecordCreatePageComponent } from './pages/records/record-create-page/record-create-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


/** components */
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { RecordsListComponent } from './components/records-list/records-list.component';

/** services */
import { AuthService } from './services/auth.service';
import { AccountsService } from './services/accounts.service';
import { RecordsService } from './services/records.service';
import { CategoriesService } from './services/categories.service';
import { ChartsService } from './services/charts.service';


/** guards */
import { InitAuthGuardService } from './services/guards/init-auth-guard.service';
import { RequireAnonGuardService } from './services/guards/require-anon-guard.service';
import { RequireUserGuardService } from './services/guards/require-user-guard.service';




/** routes */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login', canActivate: [InitAuthGuardService]},
  { path: 'login', component: HomeLoginPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'signup', component: HomeSignupPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'accounts/overview', component: AccountsOverviewPageComponent , canActivate: [RequireUserGuardService] },
  { path: 'accounts/create', component: AccountCreatePageComponent, canActivate: [RequireUserGuardService] },
  { path: 'accounts/:id', component: AccountDetailPageComponent, canActivate: [RequireUserGuardService] },
  { path: 'records/create', component: RecordCreatePageComponent, canActivate: [RequireUserGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeLoginPageComponent,
    HomeSignupPageComponent,
    AuthFormComponent,
    AccountsOverviewPageComponent,
    AccountCardComponent,
    PageNotFoundComponent,
    RecordsListComponent,
    AccountDetailPageComponent,
    AccountCreatePageComponent,
    RecordCreatePageComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthService,
    InitAuthGuardService,
    RequireAnonGuardService,
    RequireUserGuardService,
    AccountsService,
    RecordsService,
    CategoriesService,
    ChartsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
