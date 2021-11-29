import { Component, OnInit } from '@angular/core';
import { IconType, RecentForms } from 'src/app/models/RecentForms';

@Component({
  selector: 'app-recent-forms',
  templateUrl: './recent-forms.component.html',
  styleUrls: ['./recent-forms.component.css']
})
export class RecentFormsComponent implements OnInit {
  
  recentForms: RecentForms[] = [
    {
      name: 'Activity',
      folder:'Department',
      closedon: '28th June 2021',
      totalresponses:40,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Online Course',
      folder:'Student',
      closedon: '17th June 2021',
      totalresponses: 15,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Seminar',
      folder:'Department',
      closedon: '28th June 2021',
      totalresponses:35,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Research and Consultancy',
      folder:'Faculty',
      closedon: '28th June 2021',
      totalresponses:85,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Major Programs',
      folder:'Department Activity',
      closedon: '28th June 2021',
      totalresponses:35,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    },
    {
      name: 'Software Development Cell',
      folder:'Best Practices',
      closedon: '28th June 2021',
      totalresponses:35,
      active: false,
      routePath: '/dashboard',
      icon: 'insert_drive_file',
      iconType: IconType.material
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
