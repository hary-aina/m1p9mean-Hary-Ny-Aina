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

  type_user_name : string;

  //pagination du menu
  per_page = 20;
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
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {

    if(!(this.type_user_name == "client" && this.token != undefined)){
      this.router.navigate(['/login']);
    }else{
      //determination de l'action
      this.action = history.state.action;

      //nouvel commande
      if(this.action == 'insert'){
        this.extraPlat = history.state.plat;

        let now = new Date();

        this.CommandeObject = {
          restaurant_id: this.extraPlat.restaurant_id,
          restaurant_name: this.extraPlat.restaurant_name,
          prix_global: parseFloat(this.extraPlat.prix),
          revient_global: parseFloat(this.extraPlat.revient),
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
                plat_prix: parseFloat(this.extraPlat.prix),
                plat_revient: parseFloat(this.extraPlat.revient),
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

        this.extraCommande.detail_commande.plat_prix = parseFloat(this.extraCommande.detail_commande.plat_prix);
        this.extraCommande.detail_commande.plat_revient = parseFloat(this.extraCommande.detail_commande.plat_revient);
        this.CommandeObject = {
          _id : this.extraCommande._id,
          restaurant_id: this.extraCommande.restaurant_id,
          restaurant_name: this.extraCommande.restaurant_name,
          prix_global: parseFloat(this.extraCommande.prix_global),
          revient_global: parseFloat(this.extraCommande.revient_global),
          client_id: this.extraCommande.client_id,
          client_name: this.extraCommande.client_name,
          client_contact: this.extraCommande.client_contact,
          date_comande: this.extraCommande.date_comande,
          lieu_adresse_livraison: this.extraCommande.lieu_adresse_livraison,
          livreur_id: "",
          livreur_name: "",
          detail_commande : this.extraCommande.detail_commande,
          etat: this.extraCommande.etat
        }

        //avoir menu du restaurant
        this.getPlatResto(this.extraCommande.restaurant_id);

      }

    }
  }

  //avoir plat d'un restaurant donnée
  getPlatResto(resto_id : string){
    //alert("tafiditra");
    let result = this.clientService.getPlatByRestaurant(resto_id, this.per_page, this.page_number);
      result.subscribe((data:any) => {
        if(data.status != 200){
          alert(data.data);
        }else{
          //use cookie there
          this.PlatResto = data.data;
          //console.log(this.PlatResto, "tay");
        }
      });
  }

  //|--------------------|
  //|  gestion des plat  |
  //|--------------------|

  //addPlat in list
  addPlat(plat:any){
    let tmpPlat = {
      plat_id: plat._id,
      plat_name: plat.name,
      plat_prix: parseFloat(plat.prix),
      plat_revient: parseFloat(plat.revient),
      nombre: 1
    }
    this.CommandeObject.prix_global = parseFloat(this.CommandeObject.prix_global) + parseFloat(plat.prix);
    this.CommandeObject.revient_global = parseFloat(this.CommandeObject.revient_global) + parseFloat(plat.revient);
    this.CommandeObject.detail_commande.push(tmpPlat);

    console.log(this.CommandeObject, "add Plat");
    
  }

  plusPlatNumber(plat:any){
    plat.nombre++;
    this.CommandeObject.prix_global = parseFloat(this.CommandeObject.prix_global) + parseFloat(plat.plat_prix);
    this.CommandeObject.revient_global = parseFloat(this.CommandeObject.revient_global) + parseFloat(plat.plat_revient);
    //console.log(this.CommandeObject, "+ Plat");
  }

  minusPlatNumber(plat:any){
    plat.nombre --;
    this.CommandeObject.prix_global = parseFloat(this.CommandeObject.prix_global) - parseFloat(plat.plat_prix);
    this.CommandeObject.revient_global = parseFloat(this.CommandeObject.revient_global) - parseFloat(plat.plat_revient);
    if(plat.nombre == 0){
      this.removePlat(plat);
    }
  }

  //removePlat in list
  removePlat(plat:any){
    this.CommandeObject.detail_commande = this.CommandeObject.detail_commande.filter((item: any) => item != plat);
    this.CommandeObject.prix_global = parseFloat(this.CommandeObject.prix_global) - (parseFloat(plat.plat_prix)*parseInt(plat.nombre));
    this.CommandeObject.revient_global = parseFloat(this.CommandeObject.revient_global) - (parseFloat(plat.plat_revient)*parseInt(plat.nombre));
    
  }

  //|-----------------------|
  //| fin gestion des plat  |
  //|-----------------------|


  //|-------------------------|
  //| gestion de la commande  |
  //|-------------------------|
  
  //inserer la commande
  makeOrder(){
    let result = this.clientService.makeOrdre(
        this.token, 
        this.CommandeObject.restaurant_id, 
        this.CommandeObject.restaurant_name, 
        this.CommandeObject.prix_global, 
        this.CommandeObject.revient_global, 
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
        alert(data.data);
      }else{
        //use cookie there
        //console.log(data);
        this.router.navigate(['/commande']);
      }
    });
  }

  //modifier commande
  updateOrder(){
    let result = this.clientService.updateOrdre(
        this.token, 
        this.CommandeObject._id, 
        this.CommandeObject.prix_global, 
        this.CommandeObject.revient_global, 
        this.CommandeObject.detail_commande, 
        this.CommandeObject.lieu_adresse_livraison, 
        this.CommandeObject.client_contact
      );
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert(data.data);
      }else{
        //use cookie there
        //console.log(data);
        this.router.navigate(['/commande']);
      }
    });
  }

  //determinate action
  actionOrder(){
    if(this.action == "insert"){
      this.makeOrder();
    }
    else if(this.action == "update"){
      this.updateOrder();
    }
    else{
      alert("action non defini");
    }
  }

  //|-----------------------------|
  //| fin gestion de la commande  |
  //|-----------------------------|

}
