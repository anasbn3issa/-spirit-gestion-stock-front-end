import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/shared/models/purchase';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  animations: [SharedAnimations]

})
export class ClientProfileComponent implements OnInit {
  public client : Client;
  private clientId: string;
  private inComeFromClient: any;
  purchases: Purchase[] = [];
  constructor(private clientService : ClientService,private route: ActivatedRoute) { }

  loadClient() {
    this.clientId = this.route.snapshot.params['id'];
    this.clientService.getClient(this.clientId).subscribe(
      (data)=>{
        this.client=data;

      }
    );
  }

  loadIncomeFromClient(){
    this.clientService.incomeByClient(this.clientId).subscribe(
      (data)=>{
        this.inComeFromClient=data;
      }
    );
  }
  loadPurchaseHistoryFromClient(id:string){
    this.clientService.purchaseHistoryByClient(id).subscribe(
      (data)=>{
        this.purchases=data;
      }
    );
  }
  ngOnInit(): void {
    this.loadClient();
    this.loadIncomeFromClient();
    this.loadPurchaseHistoryFromClient(this.clientId);
    
  }

}
