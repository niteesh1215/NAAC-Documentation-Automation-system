import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  path = '/files';

  recievePath(newPath: string){
    this.path = newPath;
  }

  constructor(private _interactionService:InteractionService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.notifierService.notify('success', 'You are awesome! I mean it!');

    this._interactionService.fileExplorerMessage$.subscribe((path)=>{
      this.recievePath(path);
    })
  }

}
