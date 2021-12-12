import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @Input() income: any;
  @Input() nomClient: string;
  
  constructor() { }

  ngOnInit(): void {
  }


}
