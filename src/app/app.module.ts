import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProjectComponent } from './project/project/project.component';
import { ProjectdataComponent } from './project/projectdata/projectdata.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ProjectComponent,
    ProjectdataComponent,
    VerifyEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [AuthService, LoadingService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
