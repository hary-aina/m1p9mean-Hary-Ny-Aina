import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {

  token : string;

  action : any;
  extraPlat : any = [];
  extraCommande : any = [];

  CommandeObject : any;
  PlatResto : any = [];
  Client_name : string;
  Client_id : string;
  Client_contact : string;

  //pagination du menu
  per_page = 10;
  page_number = 1;

  constructor(
    private clientService : ClientService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.router.getCurrentNavigation();
    this.Client_name = this.cookie.get('user_name');
    this.Client_id = this.cookie.get('user_id');
    this.Client_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
   }

  ngOnInit(): void {
    //determination de l'action
    this.action = history.state.action;

    //nouvel commande
    if(this.action == 'insert'){
      this.extraPlat = history.state.plat;

      let now = new Date();

      this.CommandeObject = {
        restaurant_id: this.extraPlat.restaurant_id,
        restaurant_name: this.extraPlat.restaurant_name,
        prix_global: this.extraPlat.prix,
        client_id: this.Client_id,
        client_name: this.Client_name,
        client_contact: this.Client_contact,
        date_comande: now.toISOString().split('T')[0]+" "+now.toISOString().split('T')[1],
        lieu_adresse_livraison: "",
        livreur_id: "",
        livreur_name: "",
        detail_commande : [
            {
                plat_id: this.extraPlat._id,
                plat_name: this.extraPlat.name,
                plat_prix: this.extraPlat.prix,
                nombre: 1
            }
        ],
        etat: 0 
      }

      //avoir menu du restaurant
      this.getPlatResto(this.extraPlat.restaurant_id);

    }

    //modification commande
    if(this.action == 'update'){
      this.extraCommande = history.state.commande;
      //console.log(this.extraCommande);
    }
  }

  //avoir plat d'un restaurant donnée
  getPlatResto(resto_id : string){
    //alert("tafiditra");
    let result = this.clientService.getPlatByRestaurant(resto_id, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          //this.error = "erreur lors du cosulation du serveur";
        }else{
          //use cookie there
          this.PlatResto = data.data;
          //console.log(this.PlatResto, "tay");
        }
      });
  }

  //inserer la commande
  makeOrder(){
    let result = this.clientService.makeOrdre(
        this.token, 
        this.CommandeObject.restaurant_id, 
        this.CommandeObject.restaurant_name, 
        this.CommandeObject.prix_global, 
        this.CommandeObject.client_id, 
        this.CommandeObject.client_name, 
        this.CommandeObject.client_contact, 
        this.CommandeObject.date_comande, 
        this.CommandeObject.lieu_adresse_livraison, 
        this.CommandeObject.detail_commande
      );
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de l'ajout de la commande");
      }else{
        //use cookie there
        //console.log(data);
        this.router.navigate(['/commande']);
      }
    });
  }

}
