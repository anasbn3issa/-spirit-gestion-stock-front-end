import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Stock } from 'src/app/shared/models/stock';
import { StockService } from 'src/app/shared/services/stock.service';
import { ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  toAdd: Stock;

  
  constructor(private router: Router,private form: FormBuilder,private toastr: ToastrService,private stockService: StockService) { }

  ngOnInit(): void {
    this.buildFormBasic();
    this.toAdd = new Stock();
    this.radioGroup = this.form.group({
      radio: []
    });
    ;
  }

   
  buildFormBasic() {
    this.formBasic = this.form.group({
      idStock: [''],
      libelleStock: ['',[Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(10)]],
      qte: ['0'],
      qteMin: ['',[Validators.required]],
    });
  }

  get fb() { return this.formBasic.controls; }
  get lib() { 
  console.log(this.formBasic.get('libelleStock'));
  return this.formBasic.get('libelleStock');  }

  success() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('stock ajouté.', 'Ajout effectué!', {progressBar: true});
    }, 3000);
    this.router.navigateByUrl('/stock/list');
  }

  failure() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.warning('veuillez verifier les informations.', 'formulaire invalide!', {progressBar: true});
    }, 1000);
  }


  addStock() {
    if (this.formBasic.invalid) {
      console.log(this.toAdd);
      this.failure();
      return;
    }

    this.toAdd = this.formBasic.value;
    this.stockService.addStock(this.toAdd).subscribe (res => {
      console.log(this.toAdd);
      this.success();
      this.back();
    })
      ;
    
  }
  back(): void {
    this.router.navigateByUrl('/stock/list')
  }

}
