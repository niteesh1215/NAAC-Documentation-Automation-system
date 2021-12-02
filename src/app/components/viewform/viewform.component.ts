import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Form } from 'src/app/models/form';
import { LResponse } from 'src/app/models/l_response';
import { FormsApiService, FormResponseApiService } from 'src/app/services/api_end_points/forms.service';

declare var $: any;
@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.css']
})
export class ViewformComponent implements OnInit {

  private _formId?: string;
  private _responseGroupId?: string;
  showLoadingIndicator = true;
  showButtonLoadingIndicator = false;

  formRender: any;

  formDisabled?: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private notifierService: NotifierService, private formsApiService: FormsApiService, private formResponseApiService: FormResponseApiService) { }

  ngOnInit(): void {
    this._formId = this._activatedRoute.snapshot.paramMap.get('id') || undefined;

    if (this._formId != undefined) {
      this.formsApiService.retrieveForm(this._formId).subscribe(
        {
          next: (lresponse: LResponse<Form>) => {
            console.log(lresponse.data);
            console.log(lresponse);
            this.showLoadingIndicator = false;
            if (lresponse.status === 'success') {
              this._responseGroupId = lresponse.data.responseGroupId;
              if (lresponse.data.isActive) {
                this.formDisabled = false;
              } else {
                this.formDisabled = true;
                this.notifierService.notify('error', 'This form is no longer accepting responses');
                return;
              }
              this.formRender = $('.output-form').formRender({
                formData: lresponse.data.template,
                dataType: 'json',
                render: true
              });
            } else {
              this.formDisabled = true;
            }
          },
          error: () => {
            this.showLoadingIndicator = false;
          },

          complete: () => {
            this.showLoadingIndicator = false;
          }
        }
      );
    } else {
      this.notifierService.notify('error', 'Cannot find the form');
    }
  }

  onSubmit() {
    var formData = this.formRender.userData;

    for (var field of formData) {
      var formField = (field as any);
      console.log(formField);
      if (formField.required) {
        if (formField.userData.length > 0) {
          if (formField.userData[0].trim().length == 0) {
            this.notifierService.notify('error', 'Please fill the required fields');
            return;
          }
        } else {
          this.notifierService.notify('error', 'Please fill the required fields');
          return;
        }
      }
    }

    this.formResponseApiService.saveResponse({
      submittedOn: Date.now(),
      formId: this._formId!,
      email: 'naac@gmail.com',
      responseData: formData,
      responseGroupId: this._responseGroupId!,
    }).subscribe({
      next: (lresponse: LResponse) => {
        if (lresponse.status === 'success') {
          this.notifierService.notify('success', 'Response saved successfully!');
        }
      },
      error: (e) => {
        this.notifierService.notify('error', 'Please fill the required fields');
      }
    });
  }

}
