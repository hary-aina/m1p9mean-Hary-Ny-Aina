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

  type_user_name : string;

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
    this.Client_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
    this.type_user_name = this.cookie.get('type_user_name');
  }

  ngOnInit(): void {
    if(!(this.type_user_name == "client" && this.token != undefined)){
      this.router.navigate(['/login']);
    }else{
      this.getMyCommande();
    }
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

  //|------------------------|
  //|  gestion des commandes |
  //|------------------------|

  //valider ma commande
  validateOrder(macommande:any){
    let result = this.clientService.validateOrdre(this.token, macommande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        //console.log(data);
        //this.router.navigate(['/commande']);
        macommande.etat = 10;
      }
    });
  }

  //valider ma commande
  annulerOrder(macommande:any){
    let result = this.clientService.annulerOrdre(this.token, macommande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        this.MesCommandes = this.MesCommandes.filter((item: any) => item != macommande);
      }
    });
  }

  //|---------------------------|
  //| fin gestion des commandes |
  //|---------------------------|

}
