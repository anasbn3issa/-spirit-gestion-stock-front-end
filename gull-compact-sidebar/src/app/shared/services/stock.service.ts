import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { Purchase } from '../models/purchase';

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


}
