import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/shared/services/livreur.service';
import { Livreur } from 'src/app/shared/models/livreur';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-list-livreurs',
  templateUrl: './list-livreurs.component.html',
  styleUrls: ['./list-livreurs.component.scss'],
  animations: [SharedAnimations]
})
export class ListLivreursComponent implements OnInit {

viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  total: number
  livreurs: Livreur[] = [];
  ids: number[] = []
  searchControl: FormControl = new FormControl();
  openDelete: boolean


  constructor( private livreurService : LivreurService) { 
    this.openDelete = false
  }

  ngOnInit(): void {
    this.getPage(1)
  }

  selectAll(e) {
    this.livreurs = this.livreurs.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });
  }

  delete(){
    this.ids = []
    this.livreurs.filter(l=>{
      console.log(l)
      if (l.isSelected)  
      {
        this.ids.push(l.idLivreur)
        console.log(this.ids)
      }
      return l
    })

    this.openDelete = true
  }

  sendData(value : string){
    console.log(value)
  }

  getPage(page: number) {
    this.page = page
    this.livreurService.getAllProducts(page-1,8).subscribe(res=>{
      this.livreurs = res
      this.livreurs = res['livreurs']
      this.total = res['total']
      console.log(this.total)
    })
}

}
