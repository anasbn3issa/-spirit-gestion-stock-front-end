import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';
import { DataTablesRoutingModule } from '../data-tables/data-tables-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormWizardModule } from 'src/app/shared/components/form-wizard/form-wizard.module';
import { ListLivraisonComponent } from './list-livraison/list-livraison.component';
import { EditLivraisonComponent } from './edit-livraison/edit-livraison.component';
import { DeleteLivraisonComponent } from './delete-livraison/delete-livraison.component';


@NgModule({
  declarations: [
    AddLivraisonComponent,
    ListLivraisonComponent,
    EditLivraisonComponent,
    DeleteLivraisonComponent
  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    DataTablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    FormWizardModule,
  ]
})
export class LivraisonModule { }
