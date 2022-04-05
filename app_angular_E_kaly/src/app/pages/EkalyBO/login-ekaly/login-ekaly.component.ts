import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-ekaly',
  templateUrl: './login-ekaly.component.html',
  styleUrls: ['./login-ekaly.component.css']
})
export class LoginEkalyComponent implements OnInit {

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
    this.email = "responsable@gmail.com";
    this.password = "1234";
  }

  ngOnInit(): void {
    this.cookie.deleteAll();
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
          console.log(data);
          this.cookie.set('token', data.token);  
          this.cookie.set('user_id', data.data[0]._id);
          this.cookie.set('user_name', data.data[0].name);
          this.cookie.set('user_contact', data.data[0].contact);
          this.router.navigate(['/ekaly-bo/home']);
        }
      });
    }
  }

}
