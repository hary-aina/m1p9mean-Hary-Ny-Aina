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
  plats : any = [];

  search : string;

  error = "";

  constructor(
    private clientService : ClientService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.search = "";
   }

  ngOnInit(): void {
    this.getPlat();
  }

  searchPlat(){
    this.per_page = 10;
    this.page_number = 1;
    if(this.search != ""){
      let result = this.clientService.searchPlat(this.search, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
    }else{
      this.getPlat();
    }
  }

  getPlat(){
    let result = this.clientService.getPlat(this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
  }

  next(){
    this.page_number ++;
    if(this.search != ""){
      let result = this.clientService.searchPlat(this.search, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
    }
    else{
      let result = this.clientService.getPlat(this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
    }
  }

  previous(){
    this.page_number --;
    if(this.search != ""){
      let result = this.clientService.searchPlat(this.search, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
    }
    else{
      let result = this.clientService.getPlat(this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.plats = data.data;
          console.log(this.plats);
        }
      });
    }
  }

  makeOrder(plat:any){
    this.router.navigate(['/detail_commande'], {state:{action:'insert', plat:plat}});
  }

}
