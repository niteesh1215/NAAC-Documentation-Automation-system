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
    $('#form-builder-container').formBuilder({})
  }


  addFields(form: Object) {

  }

}
