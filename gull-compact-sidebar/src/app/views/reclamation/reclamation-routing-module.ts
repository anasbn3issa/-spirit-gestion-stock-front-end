import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from '../client/add-client/add-client.component';
import { AddRecComponent } from './add-reclamation/add-rec.component';
import { ListRecComponent } from './list-reclamation/list-rec.component';

const routes: Routes = [
    {
      path: 'list',
      component: ListRecComponent
    },
    {
      path: 'add',
      component: AddRecComponent
    }
  ];

  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ReclamationRoutingModule { }
  