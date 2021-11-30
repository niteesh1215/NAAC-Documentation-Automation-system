import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { filter } from 'rxjs/internal/operators/filter';
import { IconType, MainFolders } from 'src/app/models/MainFolders';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from 'src/app/models/form';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  path?: string = '/files'
  lastPath = "";
  todeleteid='';
  
  sendPath(value: string) {
    this._interactionService.sendPath(value);
  }
  
  mainFolders: MainFolders[] = [
    
  ];

  constructor(private router: Router, private _interactionService: InteractionService, private modalService: NgbModal, private _filesApiService: FilesApiService, private notifierService: NotifierService) {

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
    this.lastPath = this.router.url;
    this.fetchfolders();
  }

  fetchfolders(){
    this.mainFolders=[];
    console.log(this.lastPath);
    this._filesApiService.retrieveFile(this.lastPath).subscribe({
      next: (lResponse: LResponse<Form[]>) => {
        console.log(lResponse);
        for (var form of lResponse.data) {
          this.mainFolders.push({id:form._id!['$oid'] as string  ,name: form.name, description: form.description, iconType: IconType.material})
        }
      }
    })
  }

  openModal(content: any, id:string) {
    this.todeleteid = id;
    console.log(this.todeleteid);
    this.modalService.open(content);
  }

  deleteFolder(): void{
    this._filesApiService.deleteFile(this.todeleteid).subscribe({
      next: (lResponse: LResponse) => {
        console.log(lResponse);
        if(lResponse.status == 'success'){
          this.fetchfolders();
          this.todeleteid = '';
          this.notifierService.notify('success', 'Deleted Successfully');
          this.modalService.dismissAll();
        }
      }
    })

  }

  renameFolder(): void{
    
  }

}
