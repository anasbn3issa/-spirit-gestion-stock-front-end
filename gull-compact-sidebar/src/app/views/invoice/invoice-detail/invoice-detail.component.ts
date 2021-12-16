import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Utils } from 'src/app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from 'src/app/shared/services/facture.service';
import { DetailFacture, Facture } from 'src/app/shared/models/facture';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { Produit } from 'src/app/shared/models/produit';
import { ProductTempService } from 'src/app/shared/services/productTemp.service';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
    viewMode: 'edit' | 'print' = 'edit';
    id: string;
    isNew: boolean;
    invoice: any = {};
    invoiceForm: FormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    clients: Client[];
    produits: Produit[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private factureService: FactureService,
        private produitService: ProductTempService,
        private clientService: ClientService
    ) { }

    ngOnInit() {
        this.loadProducts();
        this.loadClients();
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildInvoiceForm(this.invoice);
        if (this.id) {
            this.viewMode = 'print';
            this.factureService.getFacture(this.id)
                .subscribe(res => {
                    this.invoice = res;
                    this.buildInvoiceForm(this.invoice);
                })
        }
    }

    loadClients() {
        this.clientService.getClients()
            .subscribe(res => {
                this.clients = res;
            })
        console.log("this.clients : ");
        console.log(this.clients);
    }

    loadProducts() {
        this.produitService.getProducts()
            .subscribe(res => {
                this.produits = res;
            })
        console.log("this.produit : ");
        console.log(this.produits);
    }

    buildInvoiceForm(i: Facture) {
        this.invoiceForm = this.fb.group({
            idFacture: [i.idFacture],
            etat: [i.etat],
            montantRemise: [i.montantRemise],
            montantFacture: [i.montantFacture ? i.montantFacture : 0],
            dateFacture: [i.dateFacture ? Utils.dateToNgbDate(i.dateFacture) : {}],
            client: [i.client ? (i.client.idClient) : ''],
            factDetails: this.fb.array((() => {
                if (!i.factDetails) {
                    return [];
                }
                return i.factDetails.map((item) => this.createItem(item));
            })())
        });
        // LINSTEN FOR VALUE CHANGES AND CALCULATE TOTAL
        if (this.invoiceFormSub) {
            this.invoiceFormSub.unsubscribe();
        }
        this.invoiceFormSub = this.invoiceForm.valueChanges
            .subscribe(formValue => {
                this.subTotal = this.calculateSubtotal(formValue);
            });
    }

    createItem(item: DetailFacture) {
        item = new DetailFacture();
        return this.fb.group({
            produit: [item.produit ? item.produit.idProduit : null],
            // libelle: [item.produit ? item.produit.libelle : ''],
            qte: [item.qte ? item.qte : 0],
            // prixUnitaire: [item.produit ? item.produit.prixUnitaire : 0.00],
            pourcentageRemise: [item.pourcentageRemise ? item.pourcentageRemise : 0]
        });
    }

    addItem() {
        console.log("this.produit : ");
        console.log(this.produits);
        let detFacture!: DetailFacture;
        const control = <FormArray>this.invoiceForm.controls['factDetails'];
        control.push(this.createItem(detFacture));
    }

    removeItem(i) {
        const control = <FormArray>this.invoiceForm.controls['factDetails'];
        control.removeAt(i);
    }

    saveInvoice() {
        this.saving = true;
        this.invoice = this.invoiceForm.value;
        console.log("order date before");
        console.log(this.invoiceForm.value.dateFacture);
        this.invoice.dateFacture = Utils.ngbDateToDate(this.invoiceForm.value.dateFacture);
        console.log("order date ");
        console.log(this.invoice.dateFacture);
        const one = new Promise<Facture>((resolve, reject) => {
            resolve(
                this.invoice.factDetails.map(e => {
                    this.produitService.getProduct(e.produit).subscribe(
                        f => e.produit = f
                    )
                    console.log("e ");
                    console.log(e);
                })
            );
        });

        one.then(res =>
            this.clientService.getClient(this.invoice.client).subscribe(e => {
                console.log("res = ");
                console.log(res);
                this.invoice.client = e;
                console.log("this invoice : ");
                console.log(this.invoice);
                this.factureService.saveFacture(this.invoiceForm.value, this.invoice.client.idClient)
                    .subscribe((savedInvoice: Facture) => {
                        this.viewMode = 'print';
                        this.saving = false;
                        this.toastr.success('Invoice Saved!', 'Success!', { timeOut: 3000 });
                        if (this.isNew) {
                            this.router.navigateByUrl('/invoice/edit/' + savedInvoice.idFacture);
                        }
                    });
            }));
        // TODO: CHANGE 2 INTO DYNAMIC CLIENT
    }



    calculateSubtotal(invoice) {

        let dfMontantRemise = 0;
        let dfPrixTotal = 0;
        let montantRemise = 0;
        let montantSansRemise = 0;

        console.log("invoice dans suntsdq");
        console.log(invoice);

        invoice.factDetails.forEach(i => {
            console.log("factDetails dans suntsdq");
            console.log(i);

            dfMontantRemise = ((i.produit.prixUnitaire * i.pourcentageRemise) / 100) * i.qte;
            dfPrixTotal = i.produit.prixUnitaire * i.qte;

            montantRemise = montantRemise + dfMontantRemise;
            montantSansRemise = montantSansRemise + dfPrixTotal;
        });

        return montantSansRemise;
    }

    print() {
        if (window) {
            window.print();
        }
    }

}
