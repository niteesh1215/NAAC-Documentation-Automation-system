import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';

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

  constructor(private _interactionService:InteractionService) { }

  ngOnInit(): void {
    this._interactionService.fileExplorerMessage$.subscribe((path)=>{
      this.recievePath(path);
    })
  }

}
