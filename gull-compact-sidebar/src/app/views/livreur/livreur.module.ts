import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListLivreursComponent } from './list-livreurs/list-livreurs.component';
import { LivreurRoutingModule } from './livreur-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AddLivreurComponent } from './add-livreur/add-livreur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';


@NgModule({
  declarations: [
    ListLivreursComponent,
    AddLivreurComponent
  ],
  imports: [
    LivreurRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SharedComponentsModule,

  ]
})
export class LivreurModule { }
