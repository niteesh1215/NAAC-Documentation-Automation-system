import { Component, OnInit } from '@angular/core';
import { IconType, ActiveForms } from 'src/app/models/ActiveForms';
import { FormsApiService } from 'src/app/services/api_end_points/forms.service';
import { LResponse } from 'src/app/models/l_response';
import { File } from 'src/app/models/file';
import { InteractionService } from 'src/app/services/interaction_services/interaction.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-active-forms',
  templateUrl: './active-forms.component.html',
  styleUrls: ['./active-forms.component.css']
})
export class ActiveFormsComponent implements OnInit {

  activeForms: ActiveForms[ ] = [ ];
  showLoadingIndicator = false;
   
  constructor(private _formsApiService: FormsApiService, private notifierService: NotifierService, private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.fetchActiveForm();
  }

  fetchActiveForm(){
    this.showLoadingIndicator = true;
    this.activeForms = [];
    this._formsApiService.retrieveActiveForm().subscribe({
      next: (lResponse: LResponse<File[]>) => {
        for (var file of lResponse.data) {
          let d = new Date(file.createdOn).toLocaleDateString("en-US");
          this.activeForms.push({name: file.name, id: file._id!['$oid'] as string, iconType: IconType.material, description: file.description, routePath: file.path, createdOn: d, icon: 'insert_drive_file'});
        }
      }, error: (e) => {
        this.notifierService.notify('error', 'Some Error Occured');
      },
      complete: () => {
        this.showLoadingIndicator = false;
      }
    })
  }

}
