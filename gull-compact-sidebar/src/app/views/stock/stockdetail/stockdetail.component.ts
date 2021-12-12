import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from 'src/app/shared/models/stock';
import { StockService } from 'src/app/shared/services/stock.service';


@Component({
  selector: 'app-stockdetail',
  templateUrl: './stockdetail.component.html',
  styleUrls: ['./stockdetail.component.scss']
})
export class StockdetailComponent implements OnInit {

  public idS : number;
  public TVA : number;
  public valS : number;
  public valPS : number;
  public stock: Stock;
  public products: any[] = [];
  public productsNonAss: any [] = [];
  public autres: any [] = [];

  constructor(private modalService: NgbModal,private router: Router,private stockService : StockService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStock();
    this.loadProducts();
    this.loadProductsNonAssign();
    this.tauxTVA();
    this.valStock();
    this.valPropreStock();
    this.autresProd();

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

  loadProducts() {
    this.idS=this.route.snapshot.params['id']; 
    this.stockService.viewProducts(this.idS).subscribe(
      (data) => {
        console.log(data);
        this.products = data;
        console.log(this.products);

      }
    );
  }
 
  loadProductsNonAssign() {
    this.idS=this.route.snapshot.params['id']; 
    this.stockService.prodNonAssign(this.idS).subscribe(
      (data) => {
        console.log(data);
        this.productsNonAss = data;
        console.log(this.productsNonAss);

      }
    );
  }

  autresProd() {
    this.idS=this.route.snapshot.params['id']; 
    this.stockService.existeAussi(this.idS).subscribe(
      (data) => {
        console.log(data);
        this.autres = data;
        console.log(this.productsNonAss);

      }
    );
  }

  assignerProduit(idP : number)
  { this.stockService.assignProduct(idP,this.idS).subscribe(res => {
    this.loadStock();
   location.reload();


  });}

  deleteProd(idP : number)
  { this.stockService.deleteProduct(idP,this.idS).subscribe(res => {
    this.loadStock();
    location.reload();
  });}

  tauxTVA()
  { this.stockService.tauxTVA(this.idS).subscribe(
    (data) => {
      console.log(data);
      this.TVA= data;}
  )}

  valStock()
  { this.stockService.stockValue(this.idS).subscribe(
    (data) => {
      console.log(data);
      this.valS= data;}
  )}

  valPropreStock()
  { this.stockService.valeurPropreStock(this.idS).subscribe(
    (data) => {
      console.log(data);
      this.valPS= data;}
  )}
  
  back(): void {
    this.router.navigateByUrl('/stock/list')
  }

  stockInsuffisant(): boolean{
   return this.stock.qte < this.stock.qteMin;
  }
}
