import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';
import { ListLivraisonComponent } from './list-livraison/list-livraison.component';

const routes: Routes = [
  {path:'add', component: AddLivraisonComponent},
  {path:'list', component: ListLivraisonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
