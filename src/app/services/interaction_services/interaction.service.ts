import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _fileExplorerMessageSource = new Subject<string>();

  fileExplorerMessage$ = this._fileExplorerMessageSource.asObservable();

  constructor() {

  }

  sendPath(path: string) {
    this._fileExplorerMessageSource.next(path);
  }
}
