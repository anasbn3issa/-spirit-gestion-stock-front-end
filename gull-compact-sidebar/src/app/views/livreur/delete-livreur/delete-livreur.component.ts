import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LivreurService } from 'src/app/shared/services/livreur.service';

@Component({
  selector: 'app-delete-livreur',
  templateUrl: './delete-livreur.component.html',
  styleUrls: ['./delete-livreur.component.scss']
})
export class DeleteLivreurComponent implements OnInit, OnChanges {

  @Input() ids : number[]
  @Output() notify = new EventEmitter<string>();
  @ViewChild('modalConfirm',{ static: false }) private modal; 


  constructor(private modalService: NgbModal, private livreurService : LivreurService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.confirm(this.modal)
  }

  ngOnInit(): void {
    console.log(this.ids)
  }

  ngAfterViewInit() {
    this.confirm(this.modal)

  }

  
  

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
    .result.then((result) => {
      this.livreurService.deleteLivreur(this.ids).subscribe(res=>{
        console.log("res")
        console.log(res)
        this.notify.emit(res.result)
        this.modalService.dismissAll(res.result)
      })
      
    }, (reason) => {
      this.notify.emit(reason)
      this.modalService.dismissAll(reason)
    });
  }

}
