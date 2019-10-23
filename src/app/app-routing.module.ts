import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListPagesComponent } from './components/list-pages/list-pages.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-pages', component: ListPagesComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
