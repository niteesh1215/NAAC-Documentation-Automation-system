import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Form } from 'src/app/models/form';
import { LResponse } from 'src/app/models/l_response';
import { FormResponseApiService, FormsApiService } from 'src/app/services/api_end_points/forms.service';

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

  responses: any = [];
  columnNames: any = [];


  isResponseEnabled?: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _notifierService: NotifierService, private formsApiService: FormsApiService, private formResponseApiService: FormResponseApiService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._formId = this._activatedRoute.snapshot.paramMap.get('id') || undefined;
    if (this._formId != undefined) {
      this.formsApiService.retrieveForm(this._formId).subscribe(
        {
          next: (lResponse: LResponse<Form>) => {
            this.form = lResponse.data;
            this.isResponseEnabled = this.form.isActive;
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

  toggleResponseView(value: boolean): void {
    this.showResponseView = value;
    if (this.showResponseView) {
      this.fetchRespnse();
    }
  }

  enableResponse(event: any) {
    if (this.form == undefined || this.form?.template.length == 0) {
      this._notifierService.notify('error', 'Form template is empty, please create one');
      return;
    }
    var status = event.currentTarget.checked;
    this.formsApiService.toggleIsFormActive(this._formId!, status).subscribe({
      next: (lResponse: LResponse) => {
        if (lResponse['status'] = 'success') {
          this._notifierService.notify('success', 'Changed status');
        }
      }, error: (e) => {
        this._notifierService.notify('error', 'Failed to change the status');
        this.isResponseEnabled = !status;
      }
    });
  }


  fetchRespnse() {
    this.responses = [];
    this.formResponseApiService.getResponses(this._formId!, "").subscribe({
      next: (lResponse: LResponse) => {
        if (lResponse['status'] === 'success') {
          console.log(lResponse);
          //this.responses = lResponse.data;
          for (var response of lResponse.data) {
            console.log('dsaldj')
            var json: any = {}
            for (var field of response.responseData) {
              if (field['userData'] != undefined) {
                console.log(field);
                if (!this.columnNames.find(function (name: string) {
                  return name == field.label;
                })) {
                  this.columnNames.push(field['label']);
                }
                var key: any = field['label'];
                var value = field.userData.join(' ');

                json[key] = value;

              }
            }
            this.responses.push(json);
          }
          console.log(this.columnNames);

          console.log(this.responses);


        } else {
          this._notifierService.notify('error', 'Could not find the data');
        }
      }
    })
  }

}
