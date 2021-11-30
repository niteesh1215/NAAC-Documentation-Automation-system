import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/root/sidebar/sidebar.component';
import { MainComponent } from './components/root/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilesHeaderComponent } from './components/root/main/files/files-header/files-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileExplorerComponent } from './components/root/main/files/file-explorer/file-explorer.component';
import { ViewformComponent } from './components/viewform/viewform.component';
import { ActiveFormsComponent } from './components/root/main/dashboard/active-forms/active-forms.component';
import { RecentFormsComponent } from './components/root/main/dashboard/recent-forms/recent-forms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    routingComponents,
    FilesHeaderComponent,
    FileExplorerComponent,
    ViewformComponent,
    ActiveFormsComponent,
    RecentFormsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule.withConfig(
      {
        position: {
          horizontal: {
            position: 'right',
            distance: 12
          },
          vertical: {
            position: 'top',
            distance: 12,
            gap: 10
          }
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
