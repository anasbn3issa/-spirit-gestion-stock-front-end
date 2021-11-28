import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() myError;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.myError.currentValue.required){
      this.myError="ce champ est nécessaire"
    }
    else if (changes.myError.currentValue.minlength){
      this.myError="ce champ doit contenir au moins"+changes.myError.currentValue.minlength.requiredLength+" caractères";
    }
    else if (changes.myError.currentValue.pattern!=null){
      this.myError="ce champ doit suivre un certain modèle";
    }
    else if (changes.myError.currentValue.email!=null){
      this.myError="ce champ doit être un email";
    }
  }
  ngOnInit(): void {
  }

}
