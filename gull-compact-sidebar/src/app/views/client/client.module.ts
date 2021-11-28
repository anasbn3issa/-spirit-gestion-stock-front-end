import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesRoutingModule } from '../data-tables/data-tables-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ErrorComponent } from '../../shared/error/error.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      NgxDatatableModule,
      NgbModule,
      ClientRoutingModule
    ],
    declarations: [
    ListClientComponent,
    AddClientComponent,
    ErrorComponent
  ]
  })
  export class ClientModule { }
  