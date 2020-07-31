import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProjectComponent } from './project/project/project.component';
import { ProjectdataComponent } from './project/projectdata/projectdata.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';


const routes: Routes = [
  { path: '' , canActivate: [AuthGuard] , component: ProfileComponent  },
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'verifyemail/:localId' , component: VerifyEmailComponent},
  { path: 'profile' , canActivate: [AuthGuard] , component: ProfileComponent},
  { path: 'project/:id/:date' , canActivate: [AuthGuard] , component: ProjectComponent},
  { path: 'projectdata/:id' , canActivate: [AuthGuard] , component: ProjectdataComponent},

  { path: '**' , component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
