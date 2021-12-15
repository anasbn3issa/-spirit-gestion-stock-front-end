import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  ToastrService
} from 'ngx-toastr';
import { echartStyles } from 'src/app/shared/echart-styles';
import { Livraison } from 'src/app/shared/models/livraison';
import {
  Livreur
} from 'src/app/shared/models/livreur';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import {
  LivreurService
} from 'src/app/shared/services/livreur.service';

@Component({
  selector: 'app-edit-livreur',
  templateUrl: './edit-livreur.component.html',
  styleUrls: ['./edit-livreur.component.scss']
})
export class EditLivreurComponent implements OnInit {

  formAddLivreur: FormGroup;
  loading: boolean;
  showPie: boolean = false;
  livreur: Livreur
  chartPie1: any;
  livList: Livraison[]

  @ViewChild('editModal', {
    static: false
  }) private modal;
  @Input() id: number
  @Output() notify = new EventEmitter < Livreur > ();


  constructor(private modalService: NgbModal, private fb: FormBuilder, private toastr: ToastrService, private livreurService: LivreurService, private livraisonService: LivraisonService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.confirm(this.modal)
  }

  ngOnInit(): void {
  }

  get controls() {
    return this.formAddLivreur.controls;
  }

  ngAfterViewInit() {
    this.confirm()
  }

  generateChart(res: any){
    let data =[]
    let colors=['#663399', '#ced4da']
    res.forEach((element, index)=> {
      data.push(
        {
          name: element[0],
          value: element[1],
          itemStyle: {
            color: colors[index],
          }
        }
      )

      this.chartPie1 = {
        ...echartStyles.defaultOptions, ...{
          legend: {
            show: true,
            bottom: 0,
          },
          series: [{
            type: 'pie',
            ...echartStyles.pieRing,
  
            label: echartStyles.pieLabelCenterHover,
            data: data
          }]
        }
      };
    });
    
  }

  buildForm() {
    this.livraisonService.getLivraisonsCountbyLivId(this.id).subscribe(res=>{
      if(res.length>0)
      this.showPie = true
      this.generateChart(res);
    })

    this.formAddLivreur = this.fb.group({
      etat: [this.livreur.etat, Validators.compose([Validators.required])],
      code: [this.livreur.code, Validators.compose([Validators.required])],
      date: [formatDate(this.livreur.dateAdhesion, 'yyyy-MM-dd', 'fr-FR'), Validators.compose([Validators.required])],
      nom: [this.livreur.nom, Validators.compose([Validators.required])],
      email: [this.livreur.email, Validators.compose([Validators.required, Validators.email])],
      telephone: [this.livreur.telephone, Validators.compose([Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
      addresse: [this.livreur.addresse, Validators.compose([Validators.required])],
    });
  }


  confirm() {
    console.log(this.id)
    this.livreurService.getLivreurById(this.id).subscribe(res => {
      this.livreur = res
      this.buildForm()
      this.modalService.open(this.modal, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true
        })
        .result.then((result) => {
          this.livreur.etat = this.formAddLivreur.get('etat').value
          this.livreur.addresse = this.formAddLivreur.get('addresse').value
          this.livreur.code = this.formAddLivreur.get('code').value
          this.livreur.dateAdhesion = this.formAddLivreur.get('date').value
          this.livreur.nom = this.formAddLivreur.get('nom').value
          this.livreur.email = this.formAddLivreur.get('email').value
          this.livreur.telephone = this.formAddLivreur.get('telephone').value
          this.livreur.addresse = this.formAddLivreur.get('addresse').value
          this.livreurService.updateLivreur(this.livreur).subscribe(res=>{
            this.modalService.dismissAll(res)
            this.notify.emit(res)
            this.toastr.success('Changements enregistrés.', 'Success!', {
              progressBar: true
            });
          })

        }, (reason) => {
          //this.notify.emit(reason)
          this.modalService.dismissAll(reason)
        });
    })

  }

}