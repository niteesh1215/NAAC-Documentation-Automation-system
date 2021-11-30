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

}
