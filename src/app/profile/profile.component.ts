import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { map } from 'rxjs/operators';
import { DateFormatService } from '../project/date-format.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading:boolean;
  panelOpenState = false;
  createNew = false;
  projects = [];
  constructor(private projectService: ProjectService,
              private dateFormatService: DateFormatService
              ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(){
    this.projects = [];
    this.loading = true;
    this.projectService.fetchProjects()
      .pipe(map(resData => {
        for(const key in resData){
          if(resData.hasOwnProperty(key))
            this.projects.push({...resData[key], id:key});
        }
      }))
      .subscribe(()=> this.loading = false);
  }

  onCreate(pName: string){
    this.loading = true;
    this.projectService.addproject({pName: pName, date: this.dateFormatService.dateFormatId(new Date())}).subscribe( resData => {
      this.fetchProjects();
    });
    this.createNew = false;
  }

  onDelete(id){
    this.loading = true;
    this.projectService.deleteProject(id)
      .subscribe((resData)=> {
        this.fetchProjects();
      });
  }

  getDateFromId(date){
    return this.dateFormatService.getDatefromId(date);
  }

  getTodayDateId(){
    return this.dateFormatService.dateFormatId(new Date());
  }
}
