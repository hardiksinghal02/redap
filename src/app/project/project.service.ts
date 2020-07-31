import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ProjectService implements OnInit{
  user:User;
  constructor(private http:HttpClient,
              private authService: AuthService,
              private router:Router
              ){
    this.authService.user.subscribe((user)=> this.user = user );
  }

  ngOnInit(){

  }

  addproject(data:{pName:string , date:string}){
    const info = {'info':{pName:data.pName, date:data.date}};
      return this.http.post('https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects.json',info);
  }

  fetchProjects(){
      return this.http.get('https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects.json');
  }

  addPost(id:string,field1:string, field2: string, field3:string,dateId:string){
    const postData = {
      field1:field1,
      field2:field2,
      field3:field3,
    }
    return this.http.put('https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects/'+id+'/'+dateId+'.json',postData);
  }

  async fetchData(id:string, dateId:string){
    let data;
    await this.http.get(
      'https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects/'+id+'/'+dateId+'.json')
      .toPromise().then(fetchData => {
        data = fetchData;
      });
      return data;
  }

  deleteProject(id){
    return this.http.delete('https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects/'+id+'.json' );
  }

  getDataByPid(pid:string){
    return this.http.get('https://test-e2a78.firebaseio.com/users/'+this.user.id+'/projects/'+pid+'/info.json')
      .pipe(map(resData =>  resData)).toPromise();
  }

  checkForPid(pid){
    let response;
      this.getDataByPid(pid).then(resData => {
        response = resData;
      });
      return response;
  }
}
