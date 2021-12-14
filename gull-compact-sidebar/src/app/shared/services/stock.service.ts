import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { Purchase } from '../models/purchase';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private myHttp : HttpClient) { }
  getStocks(): Observable<Stock[]> {
    
    return this.myHttp.get<Stock[]>('http://localhost:8081/SpringMVC/stock/retrieve-all-stocks');
  }
  
  deleteStock (id:number){
    return this.myHttp.delete('http://localhost:8081/SpringMVC/stock/remove-stock/'+id);
  }

  getStock(id:number): Observable<Stock> {
    return this.myHttp.get<Stock>('http://localhost:8081/SpringMVC/stock/retrieve-stock/'+id);
  }

  updateStock(stock:Stock){
    return this.myHttp.put('http://localhost:8081/SpringMVC/stock/modify-stock',stock);
  }

  addStock(stock:Stock){
    return this.myHttp.post('http://localhost:8081/SpringMVC/stock/add-stock',stock);
  }

  viewProducts(id:number): Observable<Produit[]> {
    
    return this.myHttp.get<Produit[]>('http://localhost:8081/SpringMVC/stock/retrieve-products/'+id);
  }

  assignProduct(id:number, idS:number)
  { return this.myHttp.put('http://localhost:8081/SpringMVC/stock/assign-prod/'+idS+'/'+id,null);}

  deleteProduct(id:number, idS:number)
  { return this.myHttp.put('http://localhost:8081/SpringMVC/stock/delete-prod/'+idS+'/'+id,null);}

  
  //fonctionnalités avancées : TVA , revenu, valeur propre, rentabilité
  stockValue(id:number): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/valeurStock/'+id);
  }
  
  tauxTVA(id:number): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/tauxTVA/'+id);
  }
  
  valeurPropreStock(id:number): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/valeurSansTva/'+id);
  }

  stockPlusRentable(): Observable<Stock> {
    return this.myHttp.get<Stock>('http://localhost:8081/SpringMVC/stock/stockplusrentable/');
  }

  stockMoinsRentable(): Observable<Stock> {
    return this.myHttp.get<Stock>('http://localhost:8081/SpringMVC/stock/stockmoinsrentable/');
  }
//services pour les statistiques
  pourcentageAlimentaire(): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/pourcentageAlimentaire');
  }
  pourcentageElectromenager(): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/pourcentageElectromenager');
  }
  pourcentageQuicaillerie(): Observable<number> {
    
    return this.myHttp.get<number>('http://localhost:8081/SpringMVC/stock/pourcentageQuicaillerie');
  }

  existeAussi(id : number) : Observable<Produit[]>
  {    return this.myHttp.get<Produit[]>('http://localhost:8081/SpringMVC/stock/existaussi/'+id);
}

// produits non assignées
  prodNonAssign(id : number) : Observable<Produit[]>
  {    return this.myHttp.get<Produit[]>('http://localhost:8081/SpringMVC/stock/prodNonAssig/'+id);
}





}
