import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor() { }

  @Input() purchaseHistory: any;
  ngOnInit(): void {
  }

}
