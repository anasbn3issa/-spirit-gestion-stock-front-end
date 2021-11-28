import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  public client : Client;
  private clientId: string;
  private inComeFromClient: any;
  constructor(private clientService : ClientService,private route: ActivatedRoute) { }

  loadClient() {
    this.clientId = this.route.snapshot.params['id'];
    this.clientService.getClient(this.clientId).subscribe(
      (data)=>{
        this.client=data;
        console.log(this.client);

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
  ngOnInit(): void {
    this.loadClient();
    this.loadIncomeFromClient();
    
  }

}
