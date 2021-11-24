import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/FormField';

declare var $: any;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {


  form: Form = {
    formName: '',
    description: '',
    formFields: [],
  }

  constructor() { }


  ngOnInit(): void {
    var formBuilder = $('#form-builder-container').formBuilder({
      showActionButtons: false
    });

    $('#clear-form-builder').click(function () {
      formBuilder.actions.clearFields();
    });

    $('#save-form-builder').click(function () {
      var getData = formBuilder.actions.getData('json', true);
      console.log(getData);
      //todo: call api to save form
    });
  }


  addFields(form: Object) {

  }

}
