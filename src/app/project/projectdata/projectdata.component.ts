import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { LoadingService } from 'src/app/loading.service';
import { map, timeInterval } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {DateFormatService} from '../date-format.service'
@Component({
  selector: 'app-projectdata',
  templateUrl: './projectdata.component.html',
  styleUrls: ['./projectdata.component.css']
})
export class ProjectdataComponent implements OnInit {
  fields ;
  loading:boolean
  projectData:any;
  private date:string;
  private id = this.activatedRoute.snapshot.params['id'];
  constructor(private projectService: ProjectService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute,
              private dateFormatService: DateFormatService
              ) {
    this.projectService.getDataByPid(this.id)
      .then(resData =>{
        this.projectData = resData;
      });
      this.date = this.dateFormatService.dateFormatId(new Date());
   }


  ngOnInit(): void {
      this.fetchPost(this.dateFormatService.dateFormatId(new Date));
  }

  async fetchPost(date){
    this.loading = true;
    this.fields = await this.projectService.fetchData(this.id,date);
    this.loading = false;
  }

  onSubmit(date){
    this.loading = true;
    const newDate = this.dateFormatService.dateFormatId(new Date(date));
    this.date = newDate;
    this.fetchPost(newDate);
  }

  getDataDate(){
    return this.dateFormatService.getDatefromId(this.date);
  }

  getId(){
    return this.id;
  }

  getDate(){
    return this.date;
  }

}
