import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  toAdd: Client;
  selectedFile: string;
  constructor(private router: Router,private fb: FormBuilder,private toastr: ToastrService,private clientService: ClientService) { }

  ngOnInit(): void {
    this.buildFormBasic();
    this.toAdd = new Client();
    this.selectedFile = null;
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      idClient: [''],
      nom: ['',[Validators.required,Validators.pattern("^[a-zA-Z\s]*"),Validators.minLength(3),Validators.maxLength(12)]],
      prenom: ['',[Validators.required,Validators.pattern("[a-zA-Z\s]*"),Validators.minLength(3),Validators.maxLength(12)]],
      dateDeNaissance: ['',[Validators.required]],
      password: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.required,Validators.email]],
      profession: ['',[Validators.required]],
      categorieClient: ['',[Validators.required]],
      photo: ['',],
    });
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


  onFileSelected(event) {
    this.selectedFile= event.target.files[0].name;
  }


  addClient() {
    if (this.formBasic.invalid) {
      this.failure();
      return;
    }

    this.toAdd = this.formBasic.value;
    this.toAdd.photo= "assets\\images\\faces\\" + this.selectedFile;
    this.clientService.addClient(this.toAdd).subscribe (res => {
      console.log('Client created!');
      console.log(this.toAdd);
      this.success();
      //this.router.navigateByUrl('/home');
    })
      ;
    
  }

}
