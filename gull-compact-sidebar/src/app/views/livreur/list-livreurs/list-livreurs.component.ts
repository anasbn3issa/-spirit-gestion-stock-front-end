import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/shared/services/livreur.service';

@Component({
  selector: 'app-list-livreurs',
  templateUrl: './list-livreurs.component.html',
  styleUrls: ['./list-livreurs.component.scss']
})
export class ListLivreursComponent implements OnInit {

  constructor( private livreurService : LivreurService) { }

  ngOnInit(): void {
    this.livreurService.getAllProducts(0,8).subscribe(res=>{
      console.log(res)
    })
  }

}
