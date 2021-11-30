import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { filter } from 'rxjs/internal/operators/filter';
import { IconType, MainFolders } from 'src/app/models/MainFolders';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
      name: '',
      description:'',
      iconType: IconType.material
    }
  ];

  constructor(private router: Router, private _interactionService: InteractionService, private modalService: NgbModal, private _filesApiService: FilesApiService) {

  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      var url = (val as NavigationEnd).url;
      if (this.lastPath != url) {
        console.log(url);
        this.sendPath(url);
        this.fetchfolders();
      }
    })
    this.sendPath(this.router.url);
    this.fetchfolders();
  }

  fetchfolders(){
    this._filesApiService.retrieveFile(this.router.url).subscribe({
      next: (lResponse: LResponse) => {
        console.log(lResponse);
        
      }
    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  deleteFolder(): void{

  }

  renameFolder(): void{
    
  }

}
