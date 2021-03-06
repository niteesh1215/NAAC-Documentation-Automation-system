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

  updateForm(form: Form): Observable<LResponse> {
    return this.http.put<LResponse>(this.url + '/update/' + form._id['$oid'], form);
  }

  toggleIsFormActive(id: string, isActive: boolean): Observable<LResponse> {
    return this.http.put<LResponse>(this.url + '/toggle-is-active', {
      '_id': id,
      'isActive': isActive
    });
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

  getResponses(formId: string, reponseGroupId: string): Observable<LResponse> {
    return this.http.post<LResponse>(this.url + '/retrieve', {
      "formId": formId,
      "responseGroupId": reponseGroupId
    });
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