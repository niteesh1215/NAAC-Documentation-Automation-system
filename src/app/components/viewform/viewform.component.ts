import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Form } from 'src/app/models/form';
import { LResponse } from 'src/app/models/l_response';
import { FormsApiService } from 'src/app/services/api_end_points/forms.service';
@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.css']
})
export class ViewformComponent implements OnInit {

  private _formId?: string;

  constructor(private _activatedRoute: ActivatedRoute, private notifierService: NotifierService, private formsApiService: FormsApiService) { }

  ngOnInit(): void {
    this._formId = this._activatedRoute.snapshot.paramMap.get('id') || undefined;
    console.log(this._formId);
    if (this._formId != undefined) {
      this.formsApiService.retrieveForm(this._formId).subscribe(
        {
          next: (lresponse:LResponse<Form>) =>{

          },
        }
      );
    } else {
      this.notifierService.notify('error', 'Cannot find the form');
    }
  }

}
