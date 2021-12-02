import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Form } from 'src/app/models/form';
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { NotifierService } from 'angular-notifier';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
declare var $: any;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  showLoadingIndicator: boolean = false;

  @Input()
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

  constructor(private formBuilder: FormBuilder, private _filesApiService: FilesApiService, private notifierService: NotifierService, private _interactionService: InteractionService) { }

  ngOnInit(): void {

    if (this.form._id != undefined) {
      this.formDetailsForm = this.formBuilder.group({
        name: [this.form.name, [Validators.required]],
        responseGroupId: [this.form.responseGroupId, [Validators.required]],
        limitToSingleResponse: [false],
        description: [this.form.description || '']
      });


    }

    this.form.path = this._interactionService.currentPath
    this.customFromBuilder = $('#form-builder-container').formBuilder({
      showActionButtons: false,
      defaultFields: this.form.template,
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
    this.form.description = formData.description.trim().length === 0 ? 'No description' : formData.description;
    this.form.responseGroupId = formData.responseGroupId;
    this.form.limitToSingleResponse = formData.limitToSingleResponse;
    var template = this.customFromBuilder.actions.getData();
    this.form.template = template || [];

    if (this.form._id == undefined) {
      this.form.isActive = false;
      this.form.lastModified = Date.now();
      this.form.createdOn = Date.now();
    }

    this.showLoadingIndicator = true;

    this._filesApiService.createFile({
      name: this.form.name,
      description: this.form.description || undefined,
      path: this.form.path,
      type: 'FORM',
      createdOn: this.form.createdOn!,
      formDetails: this.form,
    }).subscribe({
      next: (lResponse: LResponse<string>) => {
        if (lResponse.status == 'success') {
          this.notifierService.notify('success', 'File created Successfully!')
        } else {
          this.notifierService.notify('error', 'Failed to create the file')
        }

        this.showLoadingIndicator = false;


      }, error: (e) => {
        this.notifierService.notify('error', 'Failed to created the file')
        this.showLoadingIndicator = false;
      }
    });

  }


  addFields(form: Object) {

  }

}
