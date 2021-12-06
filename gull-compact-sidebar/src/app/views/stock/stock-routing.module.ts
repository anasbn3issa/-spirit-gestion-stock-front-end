import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { ListStockComponent } from './list-stock/list-stock.component';
import { StockdetailComponent } from './stockdetail/stockdetail.component';
const routes: Routes = [
    {
      path: 'list',
      component: ListStockComponent
    },
    {
      path: 'add',
      component: AddStockComponent
    },
    {
      path: 'edit/:id',
      component: EditStockComponent
    },
    {
      path: 'detail/:id',
      component: StockdetailComponent
    }
  ];

  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StockRoutingModule { }
  