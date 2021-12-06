import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ClientService } from 'src/app/shared/services/client.service';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss'],
  animations: [SharedAnimations]

})
export class ListStockComponent implements OnInit {

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 3;
  stocks: any[] = [];
  stock: any;

  constructor(private modalService: NgbModal,
    private stockService: StockService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.loadStocks();
   console.log(this.stocks);

  }

  loadStocks() {
    this.stockService.getStocks().subscribe(
      (data) => {
        console.log(data);
        this.stocks = data;
      }
    );
  }

  
  selectAll(e) {
    this.stocks = this.stocks.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {

    }
    console.log(this.allSelected);
  }

  // redirects to route with id parameter
  viewStock(id: number) {
    console.log(id);
    this.stockService.getStock(id).subscribe(
      (data)=> {
        this.stock=data;
      }
    );
    //this.router.navigate(['/stock/getstock/' + id]);
    
  }
  
  deleteStock(id: number) {
        this.stockService.deleteStock(id)
                .subscribe(res => {
                    this.loadStocks();
                  });
}

}


