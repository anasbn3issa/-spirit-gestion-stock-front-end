import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { echartStyles } from 'src/app/shared/echart-styles';
import { Stock } from 'src/app/shared/models/stock';
import { StockService } from 'src/app/shared/services/stock.service';


@Component({
  selector: 'app-stock-stat',
  templateUrl: './stock-stat.component.html',
  styleUrls: ['./stock-stat.component.scss']
})
export class StockStatComponent implements OnInit {

  constructor(private modalService: NgbModal,
  
    private stockService: StockService,
    private route: ActivatedRoute
    ) { }

    
    public plusR: Stock;
    public moinsR: Stock;

    alimentaire : number = 0;
    electro : number = 0;
    quicaillerie : number = 0;
    chartPie1: any;



  ngOnInit(): void {
    this.plusRentable();
    this.moinsRentable();
    this.poucentageAlimentaire();
    this.pourcentageQuicaillerie();
    this.pourcentageElectromenager();
    console.log(this.alimentaire);
    console.log(this.electro);
    console.log(this.quicaillerie);	
  }

  greet(nb: number){
    alert("Ce type  represente " + nb +" du total des produits assignés");
  }

  plusRentable(){

    this.stockService.stockPlusRentable().subscribe(
      (data)=>{
        this.plusR=data;
        console.log(this.plusR);

      }
    );
  }

  moinsRentable(){
    this.stockService.stockMoinsRentable().subscribe(
      (data)=>{
        this.moinsR=data;
        console.log(this.plusR);

      }
    );
  }

  //Statistiques
  poucentageAlimentaire(){
    this.stockService.pourcentageAlimentaire().subscribe(
      (data)=>{
        this.alimentaire=data;
        console.log(data);

      }
    );
  }
  pourcentageElectromenager(){
    this.stockService.pourcentageElectromenager().subscribe(
      (data)=>{
        this.electro=data;

      }
    );
  }
  pourcentageQuicaillerie(){
    this.stockService.pourcentageQuicaillerie().subscribe(
      (data)=>{
        this.quicaillerie=data;

      }
    );
  }

  loadChart(a:number,b:number,c:number){
    
   this.chartPie1 = {
    ...echartStyles.defaultOptions, ...{
      series: [{
        type: 'pie',
        itemStyle: echartStyles.pieLineStyle,
        data: [{
          name: 'Alimentaire',
           value: a,
          ...echartStyles.pieLabelOff,
          itemStyle: {
            borderColor: '#4CAF50',
          }
        }, {
          name: 'Electromenager',
          value: b,
          ...echartStyles.pieLabelOff,
          itemStyle: {
            borderColor: '#df0029',
          }
        }, 
          {
            name: 'Quicaillerie',
            value: c,
            ...echartStyles.pieLabelOff,
            itemStyle: {
              borderColor: '#CF1CC9',
            }
      }
        
      ]
      }]
    }
  };
  }
}
