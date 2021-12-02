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

  createFile(file: File): Observable<LResponse<string>> {
    return this.http.put<LResponse<string>>(this.url + '/create-file', file);
  }

  retrieveFile(path: string): Observable<any> {
    return this.http.post<any>(this.url + '/retrieve', {'path':path});
  }

  deleteFile(id: string): Observable<LResponse> {
    return this.http.delete<LResponse>(this.url + '/delete-file/'+id);
  }

  renameFile(id: string, name: string): Observable<any> {
    return this.http.put<LResponse<string>>(this.url + '/edit-file', {'id':id, 'editData':{'name':name}});
  }

  uploadFile(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('name',file.name);
    formData.append('path',file.path);
    formData.append('type',file.type);
    formData.append('document',file.document);    
    return this.http.post(this.url + '/upload-file',formData);
  }

}
