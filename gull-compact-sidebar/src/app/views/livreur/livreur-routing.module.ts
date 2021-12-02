import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLivreurComponent } from './add-livreur/add-livreur.component';
import { DeleteLivreurComponent } from './delete-livreur/delete-livreur.component';
import { ListLivreursComponent } from './list-livreurs/list-livreurs.component';

const routes: Routes = [
  {path:'list', component: ListLivreursComponent},
  {path:'add', component: AddLivreurComponent},
  {path:'delete', component: DeleteLivreurComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreurRoutingModule { }
