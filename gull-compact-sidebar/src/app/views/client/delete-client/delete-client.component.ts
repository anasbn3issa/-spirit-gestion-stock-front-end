import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss']
})
export class DeleteClientComponent implements OnInit {

  @Input() id : number;
  @Output() notify = new EventEmitter<string>();
  @ViewChild('modalConfirm',{ static: false }) private modal; 

  constructor(private modalService: NgbModal,private clientService: ClientService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.confirm(this.modal)
  }
  
  ngOnInit(): void {
    console.log('in delete ngOnInit'+this.id);
  }

  ngAfterViewInit() {
    console.log('in ngAfterViewInit');
    this.confirm(this.modal)

  }

  refreshPage() {
    window.location.reload();
   }
  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
    .result.then((result) => {
        this.clientService.deleteClient(this.id).subscribe(res=>{
        this.notify.emit(res.valueOf().toString());
        this.modalService.dismissAll(res.valueOf().toString());
        this.refreshPage();
      })

    }, (reason) => {
      this.notify.emit(reason)
      this.modalService.dismissAll(reason)
    });
  }
}
