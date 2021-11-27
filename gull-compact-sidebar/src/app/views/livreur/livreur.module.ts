import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListLivreursComponent } from './list-livreurs/list-livreurs.component';
import { LivreurRoutingModule } from './livreur-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';


@NgModule({
  declarations: [
    ListLivreursComponent
  ],
  imports: [
    LivreurRoutingModule,

  ]
})
export class LivreurModule { }
