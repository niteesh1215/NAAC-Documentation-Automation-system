import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { FormBuilder, Validators } from '@angular/forms'
import { LResponse } from 'src/app/models/l_response'
import { filter } from 'rxjs/internal/operators/filter';
import { IconType, MainFolders } from 'src/app/models/MainFolders';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from 'src/app/models/form';
import { File } from 'src/app/models/file';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  path?: string = '/files'
  lastPath = "";
  toRenameDeleteId = '';
  renameValue = '';

  showLoadingIndicator = false;

  sendPath(value: string) {
    this._interactionService.sendPath(value);
  }

  mainFolders: MainFolders[] = [ ];

  folderEditDetailsForm = this.formBuilder.group({
    renameFolder: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private _interactionService: InteractionService, private modalService: NgbModal, private _filesApiService: FilesApiService, private notifierService: NotifierService) {

  }

  ngOnInit(): void {
    this._interactionService.fetchFileMessageSource$.subscribe((shouldFetchFolder: boolean) => {
      if (shouldFetchFolder) this.fetchfolders()
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      var url = (val as NavigationEnd).url;
      if (this.lastPath != url && url.indexOf('/create-form') == -1) {
        this.lastPath = url;
        this.sendPath(url);
        this.fetchfolders();
      }
    })
    this.sendPath(this.router.url);
    this.lastPath = this.router.url;
    this.fetchfolders();
  }

  fetchfolders() {
    this.showLoadingIndicator = true;
    this.mainFolders = [];
    //console.log(this.lastPath);
    this.showLoadingIndicator = true;
    this._filesApiService.retrieveFile(this.lastPath).subscribe({
      next: (lResponse: LResponse<File[]>) => {
        //console.log(lResponse);
        for (var file of lResponse.data) {
          this.mainFolders.push({ id: file._id!['$oid'] as string, name: file.name, description: file.description, type: file.type, formId: file.formId, iconType: IconType.material });
        }
      },
      error: () => {

      },
      complete: () => {
        this.showLoadingIndicator = false;
      }
    })
  }

  openModal(content: any, id: string) {
    this.toRenameDeleteId = id;
    //console.log(this.toRenameDeleteId);
    this.modalService.open(content);
  }

  deleteFolder(): void {
    this._filesApiService.deleteFile(this.toRenameDeleteId).subscribe({
      next: (lResponse: LResponse) => {
        //console.log(lResponse);
        if (lResponse.status == 'success') {
          this.fetchfolders();
          this.toRenameDeleteId = '';
          this.notifierService.notify('success', 'Folder Deleted Successfully');
          this.modalService.dismissAll();
        }
      }
    })

  }

  renameFolder(): void {
    if (!this.folderEditDetailsForm.valid) return;
    const formData = this.folderEditDetailsForm.value;
    this.renameValue = formData.renameFolder;
    
    if(!this.searchFolderName(this.renameValue)) {
      this._filesApiService.renameFile(this.toRenameDeleteId,this.renameValue).subscribe({
        next: (lResponse: LResponse) => {
          //console.log(lResponse);
          if(lResponse.status == 'success') {
            this.fetchfolders();
            this.toRenameDeleteId = '';
            this.renameValue='';
            formData.renameFolder = '';
            this.notifierService.notify('success', 'Folder Rename Successfully');
            this.modalService.dismissAll();
          }
          else {
            this.notifierService.notify('error', 'Some Error Occured');
          }
        }, error: (e) => {
          this.notifierService.notify('error', 'Some Error Occured');
        }
      })
    }
    else{
      this.notifierService.notify('error', 'File/Folder Name Already Exists');
    }

  }

  searchFolderName(folderName: string){
    if(this.mainFolders.find(e => e.name === folderName)){
      return true;
    }
    return false;
  }

}
