import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  constructor(private router: Router,private fb: FormBuilder,private toastr: ToastrService,private clientService: ClientService) { }

  ngOnInit(): void {
    this.buildFormBasic();
    this.toAdd = new Client();
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      idClient: [''],
      nom: [''],
      prenom: [''],
      dateDeNaissance: [''],
      password: [''],
      email: [''],
      profession: [''],
      categorieClient: ['']
    });
  }
  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', {progressBar: true});
    }, 3000);
  }

  addClient() {

    this.toAdd = this.formBasic.value;
    this.clientService.addClient(this.toAdd).subscribe (res => {
      console.log('Client created!');
      console.log(this.toAdd);
      //this.router.navigateByUrl('/home');
    })
      ;
    this.formBasic.reset();
  }

}
