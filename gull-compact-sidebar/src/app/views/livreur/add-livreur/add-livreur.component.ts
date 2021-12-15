import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livreur } from 'src/app/shared/models/livreur';
import { LivreurService } from 'src/app/shared/services/livreur.service';

@Component({
  selector: 'app-add-livreur',
  templateUrl: './add-livreur.component.html',
  styleUrls: ['./add-livreur.component.scss']
})
export class AddLivreurComponent implements OnInit {


  formAddLivreur: FormGroup;
  loading: boolean;
  livreur: Livreur

  constructor(private fb: FormBuilder, private toastr: ToastrService, private livreurService: LivreurService, private router: Router) { }

  ngOnInit(): void {
    this.formAddLivreur = this.fb.group({
      code: ['', Validators.compose([Validators.required])],
      nom: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telephone: ['', Validators.compose([Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
      addresse: ['', Validators.compose([Validators.required])],
    });
  }

  get controls() {
    return this.formAddLivreur.controls;
  }


  submit() {
    this.loading = true;
    this.livreur = this.formAddLivreur.getRawValue()
    this.livreurService.addLivreur(this.livreur).subscribe(res=>{
      this.loading = false;
      this.toastr.success('Livreur ajouté.', 'Success!', {progressBar: true});
      this.router.navigateByUrl('/livreurs/list')
    })
  }

}
