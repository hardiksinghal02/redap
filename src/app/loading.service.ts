import {  Subject  } from 'rxjs'

export class LoadingService{
  showLoadingIndicator = new Subject<boolean>();

}
