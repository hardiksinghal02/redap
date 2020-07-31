import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router , NavigationStart , NavigationEnd  } from '@angular/router';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Redap';
  loading:boolean = false;
  private isLoggedIn:boolean;
  constructor(private authService:AuthService , private router: Router , private loadingService: LoadingService){
    this.router.events.subscribe((routerEvent)=> {
      if(routerEvent instanceof NavigationStart){
        this.loadingService.showLoadingIndicator.next(true);
      }
      if(routerEvent instanceof NavigationEnd){
        this.loadingService.showLoadingIndicator.next(false);
      }
    })
  }

  async ngOnInit(){
    this.loadingService.showLoadingIndicator.subscribe((response)=>{
      this.loading = response;
    });
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
     await this.authService.isAuthenticated().then(result => {
       this.isLoggedIn = result;
       console.log('In the promise');
      });
      console.log('Outside of promise');

  }

  onLogout(){
    this.authService.logout();
    localStorage.removeItem('userData');
  }

  getLoginStatus(){
    let status = this.isLoggedIn;
    return status;
  }

}
