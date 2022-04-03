import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  per_page = 10;
  page_number = 1;
  plats = [];

  error = "";

  constructor(
    private clientService : ClientService,
    private cookie : CookieService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getPlat();
  }

  getPlat(){
    let token = this.cookie.get('token');
    let result = this.clientService.getPlat(this.per_page, this.page_number, token);
      result.subscribe((data:any) => {
        //console.log(data);
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data;
        }
      });
  }

}
