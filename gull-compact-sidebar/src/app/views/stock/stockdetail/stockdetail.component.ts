import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/shared/models/stock';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-stockdetail',
  templateUrl: './stockdetail.component.html',
  styleUrls: ['./stockdetail.component.scss']
})
export class StockdetailComponent implements OnInit {

  public idS : number;
  public stock: Stock;
  constructor(private router: Router,private stockService : StockService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStock();
    console.log(this.stock);

  }

  loadStock(){
    this.idS=this.route.snapshot.params['id'];
    this.stockService.getStock(this.idS).subscribe(
      (data)=>{
        this.stock=data;
        console.log(this.stock);

      }
    );
  }
 

  back(): void {
    this.router.navigateByUrl('/stock/list')
  }

  stockInsuffisant(): boolean{
   return this.stock.qte < this.stock.qteMin;
  }
}
