import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/shared/services/livreur.service';
import { Livreur } from 'src/app/shared/models/livreur';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormControl } from '@angular/forms';
import { echartStyles } from 'src/app/shared/echart-styles';


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
  idToEdit: number
  livreurs: Livreur[] = [];
  ids: number[] = []
  searchControl: FormControl = new FormControl();
  openDelete: boolean
  openEdit: boolean
  chartPie1: any;


  constructor( private livreurService : LivreurService) { 
    this.openDelete = false
  }

  ngOnInit(): void {
    this.getPage(1)
    this.chartPie1 = {
			...echartStyles.defaultOptions, ...{
        legend: {
          show: true,
        },
				series: [{
          type: 'pie',
          ...echartStyles.pieRing,

          label: echartStyles.pieLabelCenterHover,
					data: [{
						name: 'Completed',
						value: 80,
						itemStyle: {
							color: '#663399',
						}
					}, {
						name: 'Pending',
						value: 20,
						itemStyle: {
							color: '#ced4da',
						}
					}]
				}]
			}
    };
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
      if (l.isSelected)  
      {
        this.ids.push(l.idLivreur)
        console.log(this.ids)
      }
      return l
    })

    this.openDelete = true
  }

  edit(id : number){
    this.idToEdit = id
    console.log(this.idToEdit)
    this.openEdit = !this.openEdit
    console.log("sfs")
    console.log(this.openEdit)
  }

  addData(value : string){
    console.log(value)
    if(value==="update successful"){
      this.ids = []
      this.livreurs = []
      this.page = 1
      this.getPage(this.page)
      this.openDelete = false
    }
  }

  editData(value : Livreur){
    this.openEdit = false
    if(value.idLivreur ==this.idToEdit){
      this.idToEdit =0
      this.ids = []
      this.livreurs = []
      this.page = 1
      this.getPage(this.page)
    }
  }

  getPage(page: number) {
    this.page = page
    this.livreurService.getAllLivreurs(page-1,8).subscribe(res=>{
      console.log(res)
      this.livreurs = res
      this.livreurs = res['livreurs']
      this.total = res['total']
    })
}


}
