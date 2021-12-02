import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListLivreursComponent } from './list-livreurs/list-livreurs.component';
import { LivreurRoutingModule } from './livreur-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AddLivreurComponent } from './add-livreur/add-livreur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesRoutingModule } from '../data-tables/data-tables-routing.module';
import { EditLivreurComponent } from './edit-livreur/edit-livreur.component';
import { DeleteLivreurComponent } from './delete-livreur/delete-livreur.component';


@NgModule({
  declarations: [
    ListLivreursComponent,
    AddLivreurComponent,
    EditLivreurComponent,
    DeleteLivreurComponent
  ],
  imports: [
    LivreurRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    DataTablesRoutingModule

  ]
})
export class LivreurModule { }
