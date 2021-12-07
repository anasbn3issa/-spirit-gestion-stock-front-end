import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesRoutingModule } from '../data-tables/data-tables-routing.module';
import { ListStockComponent } from './list-stock/list-stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { AddStockComponent } from './add-stock/add-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      NgxDatatableModule,
      NgbModule,
      StockRoutingModule,
      SharedComponentsModule
    ],
    declarations: [
    ListStockComponent,
    AddStockComponent,
    EditStockComponent
  ]
  })
  export class StockModule { }
  