import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  currentPath = '/files';

  private _fileExplorerMessageSource = new Subject<string>();
  fileExplorerMessage$ = this._fileExplorerMessageSource.asObservable();


  private _fetchFileMessageSource = new Subject<boolean>();
  fetchFileMessageSource$ = this._fetchFileMessageSource.asObservable();

  constructor() {

  }

  sendPath(path: string) {
    this.currentPath = path;
    this._fileExplorerMessageSource.next(path);
  }

  fetchFile(shouldFetchFolder: boolean){
    this._fetchFileMessageSource.next(shouldFetchFolder);
  }
}
