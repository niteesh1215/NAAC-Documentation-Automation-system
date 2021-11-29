import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.css']
})
export class ViewformComponent implements OnInit {

  private _formId?:string;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   //this._formId = this._activatedRoute.snapshot.paramMap.get('id') ;

  }

}
