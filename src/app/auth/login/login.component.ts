import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';
import { Router } from '@angular/router';
import {User} from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resetPassword:boolean = false;
  email:string='';
  resetEmail:string='';
  constructor(private authService:AuthService, private loadingService: LoadingService,private router:Router) { }

  ngOnInit(): void {

  }



  async onSubmit(form: NgForm){
    this.loadingService.showLoadingIndicator.next(true);
      let user = await this.authService.loginUser({email:form.value.email,password:form.value.password});
      if(typeof(user)=='string'){
        this.authService.handleError(user);
      }else{
        let status = await this.authService.checkEmailVerificationStatus(user.idToken);
        if(status){
          const expirationDate = new Date(new Date().getTime() + + (user.expiresIn)*1000);
          const newUser = new User(user.email ,user.localId, user.idToken, expirationDate);
          this.authService.user.next(newUser);
          localStorage.setItem('userData',JSON.stringify(newUser));
          this.router.navigate(['/profile']);
          this.loadingService.showLoadingIndicator.next(false);
        }
        else{
          this.router.navigate(['/verifyemail',user.idToken]);
        }

      }
      this.loadingService.showLoadingIndicator.next(false);
    }

    sendResetLink(email:string){
      this.authService.sendPasswordResetLink(email).subscribe(()=> console.log('Mail Sent')
      );
    }

    onKey(){
      this.email = this.email.replace(/ /g,'');
      this.resetEmail = this.resetEmail.replace(/ /g,'');
    }
}
