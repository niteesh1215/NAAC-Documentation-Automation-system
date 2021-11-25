import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  path?: string = '/files'
  
  @Output() currentpath = new EventEmitter<string>();

  lastPath = "";
  sendPath(value: string) {
    this.currentpath.emit(value);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.events.subscribe((val) => {
      
    //   console.log((val as NavigationEnd).url) })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val) => {
      var url = (val as NavigationEnd).url;
      if(this.lastPath!=url){
        console.log(url);
        this.sendPath(url)
      }
      
    })
    
  }

}
