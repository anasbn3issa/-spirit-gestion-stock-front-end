import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';
import { EditLivraisonComponent } from './edit-livraison/edit-livraison.component';
import { ListLivraisonComponent } from './list-livraison/list-livraison.component';

const routes: Routes = [
  {path:'add', component: AddLivraisonComponent},
  {path:'list', component: ListLivraisonComponent},
  {path:':id', component: EditLivraisonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
