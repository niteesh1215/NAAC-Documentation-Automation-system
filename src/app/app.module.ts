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
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    routingComponents,
    FilesHeaderComponent,
    FileExplorerComponent,
    ViewformComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
