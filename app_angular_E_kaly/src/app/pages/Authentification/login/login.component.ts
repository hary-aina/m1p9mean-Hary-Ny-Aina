import { Component, OnInit } from '@angular/core';
import { tokenApp } from 'src/environments/environment';
import { AuthentificationService } from 'src/app/services/authentification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email = '';
  password = '';

  error = {
    email: '',
    pwd: '',
    error: ''
  }

  reaload = false;

  constructor(
    private authentificationService : AuthentificationService
  ) { 
    this.email = "client@gmail.com";
    this.password = "1234";
  }

  ngOnInit(): void {
    this.login();
  }

  login(){
    this.error.email = '';
        this.error.pwd = '';
        if (this.password == '' || this.email == '') {
            this.error.email = (this.email == '') ? 'Ce champ est obligatoire' : '';
            this.error.pwd = (this.password == '') ? 'Ce champ est obligatoire' : '';
        } 
        else {
          let result = this.authentificationService.login(this.email, this.password);
          result.subscribe(data => {
            console.log(data);
            // if(){
            //   this.error.error = "erreur lors de l'authentification";
            // }else{

            // }
          });
        }
  }

}
