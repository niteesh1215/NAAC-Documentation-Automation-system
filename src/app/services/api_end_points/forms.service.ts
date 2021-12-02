import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from 'src/app/models/form';
import { LResponse } from 'src/app/models/l_response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FormsApiService extends ApiService {
  url!: string;
  constructor(private http: HttpClient) {
    super();
    this.url = this.baseUrl + '/form';
  }

  retrieveForm(formId: string): Observable<LResponse<Form>> {
    return this.http.get<LResponse<Form>>(this.url + '/retrieve/' + formId);
  }

  retrieveActiveForm(): Observable<any> {
    return this.http.get<any>(this.url + '/retrieve-active');
  }

}


@Injectable({
  providedIn: 'root'
})
export class FormResponseApiService extends ApiService {
  url!: string;
  constructor(private http: HttpClient) {
    super();
    this.url = this.baseUrl + '/form/response';
  }

  saveResponse(response: Response): Observable<LResponse> {
    return this.http.post<LResponse>(this.url + '/add', response);
  }

}


export interface Response {
  _id?: any;
  submittedOn: number,
  formId: string,
  email: string,
  responseData: any,
  responseGroupId: string,

}