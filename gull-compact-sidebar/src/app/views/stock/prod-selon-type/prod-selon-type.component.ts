import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-prod-selon-type',
  templateUrl: './prod-selon-type.component.html',
  styleUrls: ['./prod-selon-type.component.scss']
})
export class ProdSelonTypeComponent implements OnInit {
  @Output() greetEvent = new EventEmitter();
  name = 'lolilol'
 @Input() alim : number;
 @Input() elect : number;
 @Input() quinc : number;
  partalim : number;
  partquinc : number;
  partelect : number;

  constructor(    
    private stockService: StockService,
    ) {
   


    }
  type: string;

  ngOnInit(): void {

    this.partalim = this.alim/100;
    this.partelect = this.elect/100;
    this.partquinc = this.quinc/100;

  }
  
  alimP(){
    this.greetEvent.emit(this.partalim);
  }
  quincP(){
    this.greetEvent.emit(this.partquinc);
  }
  electP(){
    this.greetEvent.emit(this.partelect);
  }


}
