import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ekaly',
  templateUrl: './home-ekaly.component.html',
  styleUrls: ['./home-ekaly.component.css']
})
export class HomeEkalyComponent implements OnInit {

  user_name : string;
  user_id : string;
  user_contact : string;
  token : string;
  type_user_name : string;

  constructor(
    private cookie : CookieService,
    private router : Router
  ) {
    this.user_name = this.cookie.get('user_name');
    this.user_id = this.cookie.get('user_id');
    this.user_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {

    if(this.type_user_name != "responsable" || this.token == undefined){
      this.router.navigate(['/ekaly-bo/login']);
    }else{
      //things to do on init
    }

  }

}
