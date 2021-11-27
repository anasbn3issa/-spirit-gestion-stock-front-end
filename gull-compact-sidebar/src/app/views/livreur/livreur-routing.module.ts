import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLivreursComponent } from './list-livreurs/list-livreurs.component';

const routes: Routes = [
  {path:'list', component: ListLivreursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreurRoutingModule { }
