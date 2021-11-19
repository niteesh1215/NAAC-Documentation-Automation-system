import { Component, OnInit } from '@angular/core';
import { IconType, MenuOption } from 'src/app/models/MenuOption';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideBarOptions: MenuOption[] = [
    {
      name: 'Dashboard',
      active: true,
      routePath: '/dashboard',
      icon: 'dashboard',
      iconType: IconType.material
    },
    {
      name: 'Files',
      active: false,
      routePath: '/files',
      icon: 'file_copy',
      iconType: IconType.material,
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  changeActiveOption(option: MenuOption): void {
    const index = this.sideBarOptions.indexOf(option);
    for (var i in this.sideBarOptions) {
      this.sideBarOptions[i].active = false;
    }
    this.sideBarOptions[index].active;
  }

}
