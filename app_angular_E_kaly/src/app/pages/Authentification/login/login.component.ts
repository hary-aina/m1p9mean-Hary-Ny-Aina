import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
    private authentificationService : AuthentificationService,
    private cookie : CookieService,
    private router : Router,
  ) { 
    this.email = "client@gmail.com";
    this.password = "1234";
  }

  ngOnInit(): void {
    
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
      result.subscribe((data:any) => {
        //console.log(data);
        if(data.status != 200){
          this.error.error = "erreur lors de l'authentification";
        }else{
          //use cookie there
          //console.log(data);
          this.cookie.set('token', data.token);  
          this.cookie.set('user', data.data[0]);
          this.router.navigate(['/home']);
        }
      });
    }
  }

}
