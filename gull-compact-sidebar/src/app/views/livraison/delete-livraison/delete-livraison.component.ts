import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LivraisonService } from 'src/app/shared/services/livraison.service';

@Component({
  selector: 'app-delete-livraison',
  templateUrl: './delete-livraison.component.html',
  styleUrls: ['./delete-livraison.component.scss']
})
export class DeleteLivraisonComponent implements OnInit, OnChanges {

  @Input() id : number
  @Output() notify = new EventEmitter<string>();
  @ViewChild('modalConfirm',{ static: false }) private modal; 

  constructor(private modalService: NgbModal, private livraisonService: LivraisonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.confirm(this.modal)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.confirm(this.modal)
  }

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
    .result.then((result) => {
      this.livraisonService.deleteLivraison(this.id).subscribe(res=>{
        this.notify.emit(res.result)
        this.modalService.dismissAll(res.result)
      })
      
    }, (reason) => {
      this.notify.emit(reason)
      this.modalService.dismissAll(reason)
    });
  }

}
