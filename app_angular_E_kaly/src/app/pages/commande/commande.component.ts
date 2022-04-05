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

  constructor(
    private clientService : ClientService,
    private cookie : CookieService,
    private router : Router
  ) { }

  ngOnInit(): void {

  }

  //avoir mes commandes
  getMyCommande(){
    let result = this.clientService.getPlat(this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          alert("erreur lors du cosulation du serveur");
        }else{
          //use cookie there
          this.MesCommandes = data.data;
          console.log(this.MesCommandes);
        }
      });
  }

}
