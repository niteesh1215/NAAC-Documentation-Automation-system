import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { File } from 'src/app/models/file'
import { FormBuilder, Validators } from '@angular/forms'
import { FilesApiService } from 'src/app/services/api_end_points/files_api.service';
import { LResponse } from 'src/app/models/l_response'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-files-header',
  templateUrl: './files-header.component.html',
  styleUrls: ['./files-header.component.css']
})
export class FilesHeaderComponent implements OnInit {

  isGridView = true;

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

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private _filesApiService: FilesApiService, private router: Router, private notifierService: NotifierService) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }
  
  onSubmitFolderDetails(){
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
        if(lResponse.status == 'success'){
          this.notifierService.notify('success', 'Folder Created Successfully');
          this.modalService.dismissAll();
        }
        else{
          this.notifierService.notify('Failed', 'Some Error Occured');
        }
      
      }, error: (e) => {
        this.notifierService.notify('Failed', 'Some Error Occured');
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
