import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LResponse } from 'src/app/models/l_response';
import { ApiService } from './api.service';
import { File } from 'src/app/models/file';

@Injectable({
  providedIn: 'root'
})
export class FilesApiService extends ApiService {

  url!: string;

  constructor(private http: HttpClient) {
    super();
    this.url = this.baseUrl + '/files';
  }

  createFile(file: File): Observable<LResponse> {
    return this.http.put<LResponse>(this.url + '/create-file', file);
  }

}
