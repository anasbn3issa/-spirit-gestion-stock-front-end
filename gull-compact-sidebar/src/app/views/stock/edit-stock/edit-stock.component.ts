import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Stock } from 'src/app/shared/models/stock';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {

  public idS : number;
  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  toModify: Stock;
  stock: Stock;


  
  constructor(private router: Router,private form: FormBuilder,private toastr: ToastrService,private stockService: StockService,private route: ActivatedRoute) { }

  ngOnInit(): void {   
    this.toModify = new Stock();
    this.loadStock();
    this.buildFormBasic();
    this.radioGroup = this.form.group({
      radio: []
    });
    ;
  }

  
  loadStock(){
    this.idS=this.route.snapshot.params['id'];
    this.stockService.getStock(this.idS).subscribe(
      (data)=>{
        this.toModify=data;
        this.stock=data;

        console.log(this.toModify);

      }
    );
  } 

  buildFormBasic() {
    this.formBasic = this.form.group({
      idStock: [],
      libelleStock: [this.toModify.libelleStock,[Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(10)]],
      qte: [],
      qteMin: [this.toModify.qteMin,[Validators.required]],
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
      this.toastr.success('stock modifié.', 'Modification effectuée!', {progressBar: true});
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


  modifyStock() {
    if (this.formBasic.invalid) {
      console.log(this.toModify);
      this.failure();
      return;
    }

    this.toModify = this.formBasic.value;
    this.toModify.idStock= this.idS;
    this.toModify.qte= this.stock.qte;

    this.stockService.updateStock(this.toModify).subscribe (res => {
      console.log(this.toModify);
      this.success();
      this.back();
    })
      ;
    
  }
  back(): void {
    this.router.navigateByUrl('/stock/list')
  }

}


