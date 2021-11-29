import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { IconType, MainFolders } from 'src/app/models/MainFolders';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  path?: string = '/files'
  lastPath = "";

  sendPath(value: string) {
    this._interactionService.sendPath(value);
  }
  mainFolders: MainFolders[] = [
    {
      name: 'Department',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Students',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Faculty',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Department Activity',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Best Practices',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Curriculum',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
    {
      name: 'Teaching Learning',
      active: false,
      routePath: '/files',
      iconType: IconType.material
    },
  ];

  constructor(private router: Router, private _interactionService: InteractionService) {

  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      var url = (val as NavigationEnd).url;
      if (this.lastPath != url) {
        console.log(url);
        this.sendPath(url);
      }
    })
    this.sendPath(this.router.url)
  }

  deleteFolder(): void{

  }

  renameFolder(): void{
    
  }

}
