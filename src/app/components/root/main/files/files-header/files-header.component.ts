import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { File } from 'src/app/models/file'
import { FormBuilder, Validators } from '@angular/forms'
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-files-header',
  templateUrl: './files-header.component.html',
  styleUrls: ['./files-header.component.css']
})
export class FilesHeaderComponent implements OnInit {

  isGridView = true;
  showCreateFormButton = false;
  uploadedDocument?: File;

  file: File = {
    name: '',
    path: '',
    description: '',
    createdOn: 0,
    type: 'FOLDER',
  }


  folderDetailsForm = this.formBuilder.group({
    folderName: ['', [Validators.required]],
    description: ['']
  });

  fileUploadForm = this.formBuilder.group({
    folderName: ['', [Validators.required]],
    description: [''],
  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private _filesApiService: FilesApiService, private router: Router, private notifierService: NotifierService, private _interactionService: InteractionService) {

  }

  ngOnInit(): void {
    this._interactionService.fileExplorerMessage$.subscribe((path: string) => {
      if (path != '/files') {
        this.showCreateFormButton = true;
      } else {
        this.showCreateFormButton = false;
      }
    });

    if (this.router.url != '/files')
      this.showCreateFormButton = true;
    else
      this.showCreateFormButton = false;
  }

  onFileSelected(event:any){
    this.uploadedDocument = <File>event.target.files[0];
  }

  onSubmitFileUpload(){
    if (!this.fileUploadForm.valid) return;
    const formData = this.folderDetailsForm.value;
    this.file.name = formData.folderName;
    this.file.description = formData.description.trim().length == 0 ? 'No Description' : formData.description;
    this.file.path = this.router.url;
    this.file.document = this.uploadedDocument;
    this.file.createdOn = Date.now();

    this._filesApiService.createFile({
      name: this.file.name,
      description: this.file.description,
      path: this.file.path,
      type: 'OTHER',
      createdOn: this.file.createdOn,
      document: this.file.document
    }).subscribe({
      next: (lResponse: LResponse) => {
        if(lResponse.status=='success'){
          this.notifierService.notify('success', 'Uploaded File Successfully');
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

  onSubmitFolderDetails() {
    if (!this.folderDetailsForm.valid) return;
    const formData = this.folderDetailsForm.value;
    this.file.name = formData.folderName;
    this.file.path = this.router.url;
    this.file.description = formData.description.trim().length == 0 ? 'No Description' : formData.description
    this.file.createdOn = Date.now();

    this._filesApiService.createFile({
      name: this.file.name,
      description: this.file.description || undefined,
      path: this.file.path,
      type: 'FOLDER',
      createdOn: this.file.createdOn,
    }).subscribe({
      next: (lResponse: LResponse) => {

        console.log(lResponse);
        if (lResponse.status == 'success') {
          this._interactionService.fetchFile(true);
          this.notifierService.notify('success', 'Folder Created Successfully');
          this.modalService.dismissAll();
        }
        else {
          this.notifierService.notify('Failed', 'Some Error Occured');
        }

      }, error: (e) => {
        this.notifierService.notify('error', 'Some Error Occured');
      }
    });

  }

  openModal(content: any) {
    this.modalService.open(content);

  }


  changeView() {
    this.isGridView = !this.isGridView;
  }

  searchFolder() {

  }

}
