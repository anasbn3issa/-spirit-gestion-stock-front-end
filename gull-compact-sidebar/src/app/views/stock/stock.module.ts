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
import { StockdetailComponent } from './stockdetail/stockdetail.component';
import { StockStatComponent } from './stock-stat/stock-stat.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PiechartComponent } from './piechart/piechart.component';
import { ProdSelonTypeComponent } from './prod-selon-type/prod-selon-type.component';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      NgxDatatableModule,
      NgbModule,
      NgxEchartsModule,
      StockRoutingModule,
      SharedComponentsModule,
      CommonModule
    ],
    declarations: [
    ListStockComponent,
    AddStockComponent,
    EditStockComponent,
    StockdetailComponent,
    StockStatComponent,
    PiechartComponent,
    ProdSelonTypeComponent
  ]
  })
  export class StockModule { }
  