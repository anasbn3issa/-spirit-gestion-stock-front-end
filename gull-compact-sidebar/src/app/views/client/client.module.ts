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
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { IncomeComponent } from './income/income.component';
import { HighlightDirective } from './highlight.directive';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      NgxDatatableModule,
      NgbModule,
      ClientRoutingModule,
      SharedComponentsModule
    ],
    declarations: [
    ListClientComponent,
    AddClientComponent,
    ClientProfileComponent,
    EditClientComponent,
    IncomeComponent,
    HighlightDirective,
    PurchaseHistoryComponent
  ]
  })
  export class ClientModule { }
  