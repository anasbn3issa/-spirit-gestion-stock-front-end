import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
  animations: [SharedAnimations]

})
export class ListClientComponent implements OnInit {

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 3;
  clients: any[] = [];
  client: any;

  constructor(private modalService: NgbModal,
    private clientService: ClientService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.loadClients();
   
  }
  loadClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data;
      }
    );
  }

  selectAll(e) {
    this.clients = this.clients.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {

    }
    console.log(this.allSelected);
  }

  // redirects to route with id parameter
  viewClient(id: string) {
    console.log(id);
    this.clientService.getClient(id).subscribe(
      (data)=> {
        this.client=data;
        console.log('aaaaaaaaa'+data.email);
      }
    );
    this.router.navigate(['/client/profile/' + id]);
    
  }
  
  deleteClient(id, modal) {
    
   /* this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })  
        .result.then((result) => {
          console.log('debug1');
            this.clientService.deleteClient(id)
                .subscribe(res => {
                    this.toastr.success('Client supprimé!', 'Success!', { timeOut: 3000 });
                })
        }, (reason) => {
        });*/
        this.clientService.deleteClient(id)
                .subscribe(res => {
                    this.toastr.success('Client supprimé!', 'Success!', { timeOut: 3000 });
                    this.loadClients();
                  });
}

}

