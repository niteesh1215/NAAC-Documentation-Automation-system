import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilesHeaderComponent } from './components/main/files/files-header/files-header.component';
import { FormBuilderComponent } from './components/main/form-builder/form-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    routingComponents,
    PageNotFoundComponent,
    FilesHeaderComponent,
    FormBuilderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
