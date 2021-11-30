import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Form } from 'src/app/models/form';
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { NotifierService } from 'angular-notifier';
declare var $: any;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  showFormBuilder: boolean = false;
  showLoadingIndicator: boolean = false;

  form: Form = {
    name: '',
    description: '',
    template: [],
    path: '',
    limitToSingleResponse: false,
    responseGroupId: ''
  }

  formDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    responseGroupId: ['', [Validators.required]],
    limitToSingleResponse: [false],
    description: ['']
  });

  customFromBuilder?: any;

  constructor(private formBuilder: FormBuilder, private _filesApiService: FilesApiService, private notifierService: NotifierService) { }

  ngOnInit(): void {    
    this.customFromBuilder = $('#form-builder-container').formBuilder({
      showActionButtons: false
    });

    $('#clear-form-builder').click(() => {
      this.customFromBuilder.actions.clearFields();
    });

    // $('#save-form-builder').click(function () {

    //   //todo: call api to save form
    // });
  }


  get f() { return this.formDetailsForm.controls; }

  onSubmitFormDetails() {
    if (!this.formDetailsForm.valid) return;
    const formData = this.formDetailsForm.value;
    this.form.name = formData.name;
    this.form.description = formData.description;
    this.form.path = '/files'
    this.form.responseGroupId = formData.responseGroupId;
    this.form.limitToSingleResponse = formData.limitToSingleResponse;
    var template = this.customFromBuilder.actions.getData();
    this.form.template = template || [];
    this.form.isActive = false;
    this.form.lastModified = Date.now();
    this.form.createdOn = Date.now();
    console.log(this.form);
    this.showFormBuilder = true;
    this.showLoadingIndicator = true;
    this._filesApiService.createFile({
      name: this.form.name,
      description: this.form.description || undefined,
      path: this.form.path,
      type: 'FORM',
      createdOn: this.form.createdOn,
      formDetails: this.form,
    }).subscribe({
      next: (lResponse: LResponse) => {

        console.log(lResponse);


      }, error: (e) => {

      }
    });

  }


  addFields(form: Object) {

  }

}
