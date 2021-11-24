import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/root/main/dashboard/dashboard.component';
import { FilesComponent } from './components/root/main/files/files.component';
import { FormBuilderComponent } from './components/root/main/form-builder/form-builder.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
const routes: Routes = [
  {
    path: '', component: RootComponent, canActivate: [AuthGuard], children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
      },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'files', component: FilesComponent,
      },
      {
        path: 'create-form', component: FormBuilderComponent,
      }
    ]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RootComponent, LoginComponent, PageNotFoundComponent, DashboardComponent, FilesComponent, FilesComponent, FormBuilderComponent,]
