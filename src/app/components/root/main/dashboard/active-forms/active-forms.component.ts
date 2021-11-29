import { Component, OnInit } from '@angular/core';
import { IconType, ActiveForms } from 'src/app/models/ActiveForms';
@Component({
  selector: 'app-active-forms',
  templateUrl: './active-forms.component.html',
  styleUrls: ['./active-forms.component.css']
})
export class ActiveFormsComponent implements OnInit {

  activeForms: ActiveForms[] = [
    {
      name: 'Activity',
      folder:'Department',
      activefrom: '28th June 2021',
      totalresponses:40,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Online Course',
      folder:'Student',
      activefrom: '17th June 2021',
      totalresponses: 15,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Seminar',
      folder:'Department',
      activefrom: '28th June 2021',
      totalresponses:35,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Research and Consultancy',
      folder:'Faculty',
      activefrom: '28th June 2021',
      totalresponses:85,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Major Programs',
      folder:'Department Activity',
      activefrom: '28th June 2021',
      totalresponses:35,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Software Development Cell',
      folder:'Best Practices',
      activefrom: '28th June 2021',
      totalresponses:35,
      active: true,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
