import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  path = '';

  recievePath(newPath: string){
    this.path = newPath;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
