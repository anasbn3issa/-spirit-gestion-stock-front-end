import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livraison } from 'src/app/shared/models/livraison';
import { Livreur } from 'src/app/shared/models/livreur';
import { LivraisonService } from 'src/app/shared/services/livraison.service';

@Component({
  selector: 'app-edit-livraison',
  templateUrl: './edit-livraison.component.html',
  styleUrls: ['./edit-livraison.component.scss']
})
export class EditLivraisonComponent implements OnInit {

  formAddLivreur: FormGroup;
  etatControl: FormControl
  loading: boolean;
  livraison: Livraison
  id: number
  

  constructor(private router: Router, private fb: FormBuilder, private livraisonService: LivraisonService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = false
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.livraisonService.getLivraisonById(this.id).subscribe(res=>{
      this.livraison = res
      console.log(this.livraison)
      this.etatControl = new FormControl(this.livraison.etat)

    })
  }

  submit() {
    this.loading = true;
    this.livraison.etat = this.etatControl.value
    this.livraisonService.updateLivraison(this.livraison).subscribe(res=>{
      this.toastr.success('Livraison mise a jour.', 'Success!', {progressBar: true});
      this.loading = false
      this.router.navigateByUrl('/livraison/list')
    })
  }

}
