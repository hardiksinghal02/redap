import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  localId:string;
  constructor(private router:ActivatedRoute,private authService:AuthService) { }

  async ngOnInit(): Promise<void> {
    this.localId = this.router.snapshot.params['localId'];
  }

  sendMail(){
    this.authService.sendVerificationMail(this.localId);
  }

}
