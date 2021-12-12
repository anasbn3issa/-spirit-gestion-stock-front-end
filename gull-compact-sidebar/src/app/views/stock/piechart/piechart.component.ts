import { Component, Input, OnInit } from '@angular/core';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { echartStyles } from 'src/app/shared/echart-styles';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})


export class PiechartComponent implements OnInit {
  chartPie1: any;
  @Input() alim : number;
  @Input() quic : number;
  @Input() elect : number;

  constructor() { }

  ngOnInit(): void {
    this.loadChart(this.alim,this.elect,this.quic);

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
