import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesRoutingModule } from '../data-tables/data-tables-routing.module';
import { ReclamationRoutingModule } from './reclamation-routing-module';
import { AddRecComponent } from './add-reclamation/add-rec.component';
import { ListRecComponent } from './list-reclamation/list-rec.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      NgxDatatableModule,
      NgbModule,
      ReclamationRoutingModule
    ],
    declarations: [
    ListRecComponent,
    AddRecComponent,
  
  ]
  })
  export class ReclamationModule { }
  