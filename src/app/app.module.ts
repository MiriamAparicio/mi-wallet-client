
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

/** components */
import { AuthFormComponent } from './components/auth-form/auth-form.component';

/** services */
import { AuthService } from './services/auth.service';

/** guards */
import { InitAuthGuardService } from './services/guards/init-auth-guard.service';
import { RequireAnonGuardService } from './services/guards/require-anon-guard.service';
import { RequireUserGuardService } from './services/guards/require-user-guard.service';
import { AccountsOverviewPageComponent } from './pages/accounts/accounts-overview-page/accounts-overview-page.component';


/** routes */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login', canActivate: [InitAuthGuardService]},
  { path: 'login', component: HomeLoginPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'signup', component: HomeSignupPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'accounts/overview', component: AccountsOverviewPageComponent , canActivate: [RequireUserGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeLoginPageComponent,
    HomeSignupPageComponent,
    AuthFormComponent,
    AccountsOverviewPageComponent,
    
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
    RequireUserGuardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
