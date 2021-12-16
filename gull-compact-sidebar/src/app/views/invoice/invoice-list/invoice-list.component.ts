import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from 'src/app/shared/services/facture.service';
import { Facture } from 'src/app/shared/models/facture';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
    invoices: Facture[];

    constructor(
        private modalService: NgbModal,
        private toastr: ToastrService,
        private factureService: FactureService
    ) { }

    ngOnInit() {
        this.loadInvoices();
        console.log("thies invoices : ");
        console.log(this.invoices);
    }

    loadInvoices() {
        this.factureService.getFactures()
            .subscribe(res => {
                this.invoices = res;
            })
    }

    deleteInvoice(id, modal) {
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => {
                this.factureService.deleteFacture(id)
                    .subscribe(res => {
                        this.toastr.success('Invoice Deleted!', 'Success!', { timeOut: 3000 });
                        this.loadInvoices();
                    })
            }, (reason) => {
            });
    }

}
