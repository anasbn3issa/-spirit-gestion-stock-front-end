import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ListClientComponent } from './list-client/list-client.component';
const routes: Routes = [
    {
      path: 'list',
      component: ListClientComponent
    },
    {
      path: 'add',
      component: AddClientComponent
    },
    {
      path: 'profile/:id',
      component: ClientProfileComponent
    }
  ];

  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }
  