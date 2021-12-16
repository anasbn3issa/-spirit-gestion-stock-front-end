import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produit } from '../models/produit';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductTempService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    getProducts(): Observable<Produit[]> {
        return this.httpClient.get<Produit[]>('http://localhost:8081/SpringMVC/product/get-products');
    }

    getProduct(id: string): Observable<Produit> {
        return this.httpClient.get<Produit>('http://localhost:8081/SpringMVC/product/retrieve-product/' + id);
    }
}
