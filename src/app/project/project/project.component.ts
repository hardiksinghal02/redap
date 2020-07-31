import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { LoadingService } from 'src/app/loading.service';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectData;
  fields;
  editing:boolean = false;
  private id:string;
  private date:string ;
  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private loadingService: LoadingService,
              private dateFormatService: DateFormatService,
              private router: Router)
  {

  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.date = this.activatedRoute.snapshot.params['date']!='' ?this.activatedRoute.snapshot.params['date']: this.dateFormatService.dateFormatId(new Date());
     await this.projectService.getDataByPid(this.id).then(resData => {
        this.projectData = resData;
        if(resData == null)
          this.router.navigate(['profile']);
      else{
        if(this.dateFormatService.dateCompare(this.dateFormatService.dateFormatId(new Date()),this.date)){
          if(this.dateFormatService.dateCompare(this.date, this.projectData.date)){
              return;
          }
        }
        this.router.navigate(['profile']);
      }
      });
      this.loadingService.showLoadingIndicator.next(true);
      let fields = await this.projectService.fetchData(this.id,this.date);
      if(fields===null){
        this.fields = {field1:'',field2:'',field3:''};
      }else{
        this.fields = fields;
        this.editing = true;
      }
      this.loadingService.showLoadingIndicator.next(false);
      // this.projectService.fetchData(this.id, this.date)
      //   .subscribe(resData => {
      //     if(resData === null){
      //       this.fields = {field1:'',field2:'',field3:''};
      //     }else{
      //       this.fields = resData;
      //       console.log(this.fields);
      //       this.editing = true;
      //       console.log(this.editing);
      //     }
      //   });
  }

  onSubmit(form: NgForm){
      this.loadingService.showLoadingIndicator.next(true);
      this.projectService.addPost(this.id,
                                  form.value.field1,
                                  form.value.field2,
                                  form.value.field3,
                                  this.date)
        .subscribe(postData => {
          this.loadingService.showLoadingIndicator.next(false);
        });
        this.router.navigate(['/projectdata',this.id]);
  }

}
