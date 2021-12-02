import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Form } from 'src/app/models/form';
import { LResponse } from 'src/app/models/l_response';
import { FormsApiService } from 'src/app/services/api_end_points/forms.service';

@Component({
  selector: 'app-form-customization-and-response-view',
  templateUrl: './form-customization-and-response-view.component.html',
  styleUrls: ['./form-customization-and-response-view.component.css']
})
export class FormCustomizationAndResponseViewComponent implements OnInit {

  showResponseView = false;
  isLoading = false;
  _formId?: string;
  form?: Form;

  constructor(private _activatedRoute: ActivatedRoute, private _notifierService: NotifierService, private formsApiService: FormsApiService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._formId = this._activatedRoute.snapshot.paramMap.get('id') || undefined;
    if (this._formId != undefined) {
      this.formsApiService.retrieveForm(this._formId).subscribe(
        {
          next: (lResponse: LResponse<Form>) => {
            this.form = lResponse.data;
          },
          error: () => {
            this._notifierService.notify('error', 'An error occured while retrieving the form');
          },
          complete: () => {
            this.isLoading = false;
          }
        }
      );

    } else {
      this._notifierService.notify('error', 'Cannot find the form');
    }
  }

}
