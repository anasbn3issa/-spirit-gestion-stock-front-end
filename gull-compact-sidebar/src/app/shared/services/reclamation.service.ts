import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private myHttp : HttpClient) { }
  getRec(): Observable<Reclamation[]> {
    
    return this.myHttp.get<Reclamation[]>('http://localhost:8081/SpringMVC/claim/get-all-claims');
  //  return this.myHttp.get<Reclamation[]>('http://localhost:8089/SpringMVC/client/retrieve-all-clients');
  }

}
