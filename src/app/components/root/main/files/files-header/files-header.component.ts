import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-files-header',
  templateUrl: './files-header.component.html',
  styleUrls: ['./files-header.component.css']
})
export class FilesHeaderComponent implements OnInit {

  isGridView = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
