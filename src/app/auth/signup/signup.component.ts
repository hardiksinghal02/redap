import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email:string;
  password:string;
  constructor(private authService: AuthService,private loadingService: LoadingService, private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm){
    this.loadingService.showLoadingIndicator.next(true);
    const userData = await this.authService.registerUser(form.value.email,form.value.password,form.value.name);
    if(typeof(userData)=='string'){
      this.authService.handleError(userData);
    }
    else{
      await this.authService.sendVerificationMail(userData.idToken);
      this.router.navigate(['/verifyemail',userData.idToken]);
    }
    this.loadingService.showLoadingIndicator.next(false);
  }

  onKeyUp(property){
    if(property == 'email'){
      this.email = this.email.replace(/ /g,'');
    }else{
      if(property == 'password'){

      }
    }
  }
}
