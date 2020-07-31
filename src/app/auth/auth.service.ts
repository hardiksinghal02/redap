import { User } from './user.model';
import { AuthData } from './auth-data.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../loading.service';
import {BehaviorSubject, throwError, Subject, Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

interface authResponseData{
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string	;
  registered?: boolean;
}

@Injectable()
export class AuthService{

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  private
  constructor(private http:HttpClient ,private _snackBar: MatSnackBar,private router:Router){}

 async registerUser( email:string , password:string, name:string):Promise<authResponseData | string>{
    const authData ={
      email: email,
      password: password,
      returnSecureToken: true
    };
    let userData:authResponseData;
    let error:string;
    await this.http.post<authResponseData>(
       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9gH40v4PuQDwwiGVw-zqr1UZoOgjw81I',
       authData).toPromise().then((response) => {
        userData = response;
       }).catch((err:HttpErrorResponse) => {
        error = err.error.error.message;
      }
       );
       if(!!error)
        return error;
    return userData;
    }

    async loginUser(authData: AuthData){
      let user: authResponseData;
      let error:string;
      await this.http.post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9gH40v4PuQDwwiGVw-zqr1UZoOgjw81I',
        {...authData,returnSecureToken: true}).toPromise()
        .then((response)=>{
          user = response;
        }).catch((errorRes:HttpErrorResponse)=> {
          error = errorRes.error.error.message;
        });
        if(!!error)
          return error;
        return user;
    }

    logout(){
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
      if(this.tokenExpirationTimer)
        clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }

  autoLogin(){
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData)
    return ;
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token)
    this.user.next(loadedUser);
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  handleError(errorMessage:string){
    let newMessage = errorMessage.replace(/_/g,' ');
    this.openSnackBar(newMessage);
  }

  async isAuthenticated(){
    let authenticationStatus:boolean;
    await this.user.toPromise().then(status => {
      authenticationStatus = !!status;
    });
    return authenticationStatus;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  async sendVerificationMail(idToken){
    await this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD9gH40v4PuQDwwiGVw-zqr1UZoOgjw81I',
        {"requestType":"VERIFY_EMAIL","idToken": idToken}).toPromise()
        .then((response) => {
          console.log('Verification email sent');
        });
  }

   async checkEmailVerificationStatus(token:string){
    let status:boolean;
    let error:string;
    await this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD9gH40v4PuQDwwiGVw-zqr1UZoOgjw81I',
      { "idToken": token })
      .toPromise()
      .then((response:{users:{emailVerified:boolean}[]}) => {
        status = response.users[0].emailVerified;
      });
      return status;
  }

  sendPasswordResetLink(email:string){
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD9gH40v4PuQDwwiGVw-zqr1UZoOgjw81I',
      {"requestType":"PASSWORD_RESET","email":email});
  }

}
