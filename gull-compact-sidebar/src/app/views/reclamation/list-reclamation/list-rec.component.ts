import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ReclamationService } from 'src/app/shared/services/reclamation.service';

@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.component.html',
  styleUrls: ['./list-rec.component.scss'],
  animations: [SharedAnimations]

})
export class ListRecComponent implements OnInit {
  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 3;
  reclamations: any[] = [];

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.reclamationService.getRec().subscribe(
      (data) => {
        this.reclamations = data;
        console.log(this.reclamations);

      }
    );
  }

  selectAll(e) {
    this.reclamations = this.reclamations.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {

    }
    console.log(this.allSelected);
  }

}
