import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Livraison } from 'src/app/shared/models/livraison';
import { LivraisonService } from 'src/app/shared/services/livraison.service';

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-livraison.component.html',
  styleUrls: ['./list-livraison.component.scss']
})
export class ListLivraisonComponent implements OnInit {

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  total: number
  idToEdit: number
  filter: string
  livraisons: Livraison[] = [];
  id: number
  searchControl: FormControl = new FormControl();
  openDelete: boolean
  openEdit: boolean

  constructor(private livraisonService: LivraisonService, private router: Router) { 
    this.openDelete = false
    this.filter = ""
  }

  ngOnInit(): void {
    this.getPage(1)
    this.searchControl.valueChanges
      .subscribe(term => {
        this.filter = term;
        this.id = 0
        this.livraisons = []
        this.page = 1
        this.getPage(this.page)
      });
  }

  getPage(page: number) {
    this.page = page
    this.livraisonService.getAllLivraisons(page - 1, 8, this.filter).subscribe(res => {
      this.livraisons = res['livraisons']
      this.total = res['total']
      console.log(this.livraisons)
    })
  }

  edit(idLivraison: number){
    this.router.navigateByUrl('/livraison/'+idLivraison)
  }

  cancel(idLivraison: number){
    this.id = idLivraison
    this.openDelete = true
  }

  addData(value: string) {
    console.log(value)
    if (value === "delete successful") {
      this.id = 0
      this.livraisons = []
      this.page = 1
      this.getPage(this.page)
      this.openDelete = false
    }
  }

}
