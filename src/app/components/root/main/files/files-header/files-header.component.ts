import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-header',
  templateUrl: './files-header.component.html',
  styleUrls: ['./files-header.component.css']
})
export class FilesHeaderComponent implements OnInit {

  isGridView = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeView() {
    this.isGridView = !this.isGridView;
  }

  searchFolder() {

  }

}
