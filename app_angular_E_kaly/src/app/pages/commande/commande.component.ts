import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  MesCommandes : any = [];

  Client_name : string;
  Client_id : string;
  Client_contact : string;
  token : string;

  //pagination du menu
  per_page = 10;
  page_number = 1;

  constructor(
    private clientService : ClientService,
    private cookie : CookieService,
    private router : Router
  ) { 
    this.Client_name = this.cookie.get('user_name');
    this.Client_id = this.cookie.get('user_id');
    this.Client_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
  }

  ngOnInit(): void {
    this.getMyCommande();
  }

  //avoir mes commandes
  getMyCommande(){
    let result = this.clientService.getCommande(this.token, this.Client_id, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          alert("erreur lors du cosulation du serveur");
        }else{
          //use cookie there
          this.MesCommandes = data.data;
          //console.log(this.MesCommandes);
        }
      });
  }

  //voir detail
  getDetailCommande(macommande:any){
    this.router.navigate(['/detail_commande'], {state:{action:'update', commande:macommande}});
  }

}
