import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class DateFormatService{

  dateFormatId(date: Date):string{
    const day = date.getDate()/10 < 1? '0'+date.getDate() : date.getDate();
    const month = date.getMonth()/10 < 1? '0'+(date.getMonth()+1): date.getMonth();
    const year = date.getFullYear();
    const dateId = day+''+month+''+year;
    return dateId;
  }

  getDatefromId(dateId:string){
    var months = ["January",
                  "February", "March", "April", "May",
                  "June", "July", "August", "September",
                  "October", "November", "December"
                ];
    const formattedDate = months[(+dateId.slice(2,4)-1)]+' '+dateId.slice(0,2)+', '+dateId.slice(4,8);
    return formattedDate;
  }

  dateCompare(date1,date2){
    if(date1.length !=8 || date2.length !=8 ){
      return false;
    }
    const d1Date = date1.slice(0,2);
    const d1Month = date1.slice(2,4);
    const d1Year = date1.slice(4,8);
    const d2Date = date2.slice(0,2);
    const d2Month = date2.slice(2,4);
    const d2Year = date2.slice(4,8);
    if(d2Year > d1Year)
      return false;
    else
      if(d2Month > d1Month)
        return false
      else
        if(d2Date > d1Date)
          return false
        else return true;
  }
}
