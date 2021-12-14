import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Facture } from 'src/app/shared/models/facture';
import { Livreur } from 'src/app/shared/models/livreur';
import { FactureService } from 'src/app/shared/services/facture.service';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { LivreurService } from 'src/app/shared/services/livreur.service';

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.scss']
})
export class AddLivraisonComponent implements OnInit {

  isCompleted: boolean;
  factures: Facture[]
  livreurs: Livreur[]
  selectedFacture: number
  selectedLivreur: number
  finalMsg: string


  constructor(private fb: FormBuilder, private livraisonService: LivraisonService, private livreurService: LivreurService, private factureService: FactureService, private router: Router) { 
    this.finalMsg = 'Cliquez pour confirmer la livraison.'
  }

  ngOnInit() {
    

    this.factureService.getOpenFactures().subscribe(factures=>{
      this.factures = factures
      this.livreurService.getActiveLivreurs().subscribe(livreurs=>{
        this.livreurs = livreurs
      })
    })

   
  }

  onStep1Next(e) {console.log(this.selectedFacture); console.log(this.selectedLivreur)}
  onStep2Next(e) {console.log(this.selectedFacture); console.log(this.selectedLivreur)}
  onStep3Next(e) {console.log(this.selectedFacture); console.log(this.selectedLivreur)}
  onComplete(e) {
    this.livraisonService.assignLivraison(this.selectedFacture, this.selectedLivreur).subscribe(res=>{
      //console.log(res)
      if(res!=null)
        {
          this.finalMsg = 'Merci! Vous avez terminé toutes les étapes.'
          setTimeout(() => {
            this.router.navigateByUrl('/livraison/list')
          }, 1000);
        }
    })
    }
}
