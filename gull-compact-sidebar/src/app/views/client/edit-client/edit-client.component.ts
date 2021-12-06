import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  formBasic: FormGroup;
  loading: boolean;
  toModify :Client;
  @Output() edited = new EventEmitter<Client>();

  private client: Client;
  private idClient: string;
  constructor(private serviceClient :ClientService,private ac: ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,private router: Router) { }


  loadClient() {
    this.serviceClient.getClient(this.idClient).subscribe(
      (client) => {
        this.client = client;
        console.log(this.client);
        this.buildFormBasic();
      }
    );
  }

  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      idClient: [this.client.idClient],
      nom: [this.client.nom,[Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(3)]],
      prenom: [this.client.prenom,[Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(3)]],
      dateDeNaissance: [this.client.dateNaissance,[Validators.required]],
      email: [this.client.email,[Validators.required,Validators.required,Validators.email]],
      profession: [this.client.profession,[Validators.required]],
      categorieClient: [this.client.categorieClient,[Validators.required]],
    });
  }


  ngOnInit(): void {
    this.idClient=this.ac.snapshot.params['id'];
    this.loadClient();
    //this.buildFormBasic();
    this.toModify = new Client();
  }

  get f() { return this.formBasic.controls; }

  
  success() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('client ajouté.', 'Succès!', {progressBar: true});
    }, 3000);
    this.router.navigateByUrl('/client/list');
  }

  
  failure() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.warning('veuillez verifier les information.', 'formulaire invalide!', {progressBar: true});
    }, 1000);
  }

  updateClient() {
    if (this.formBasic.invalid) {
      this.failure();
      return;
    }
    this.toModify= this.formBasic.value;
    this.toModify.photo = this.client.photo;
    console.log(this.toModify);
    this.serviceClient.updateClient(this.toModify).subscribe(
      (data) => {
        this.edited.emit(this.toModify);
        console.log(data);
      }
    );
    this.router.navigateByUrl('/client/list');

  }
 

}
