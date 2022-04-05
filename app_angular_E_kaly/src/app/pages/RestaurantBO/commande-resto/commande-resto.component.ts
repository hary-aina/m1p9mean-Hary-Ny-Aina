import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-commande-resto',
  templateUrl: './commande-resto.component.html',
  styleUrls: ['./commande-resto.component.css']
})
export class CommandeRestoComponent implements OnInit {

  MesCommandes : any = [];

  restaurant_name : string;
  restaurant_id : string;
  token : string;

  per_page = 10;
  page_number = 1;

  constructor(
    private restaurantService : RestaurantService,
    private cookie : CookieService,
    private router : Router
  ) { 
    this.token = this.cookie.get('token');  
    this.restaurant_name = this.cookie.get('restaurant_name');
    this.restaurant_id = this.cookie.get('restaurant_id');
  }

  ngOnInit(): void {
    this.avoirCommande();
  }

  avoirCommande(){
    let result = this.restaurantService.getComandeValider(
      this.token, 
      this.restaurant_id,
      this.per_page,
      this.page_number
    );
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        this.MesCommandes = data.data;
        
      }
    });
  }

  //demmarrer la preparation
  startPreparation(commande:any){
    let result = this.restaurantService.startCommandePreparation(this.token, commande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        commande.etat = 15;
        
      }
    });
  }

  // pret a liver
  endPreparation(commande:any){
    let result = this.restaurantService.setCommandeReady(this.token, commande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        commande.etat = 20;
        
      }
    });
  }

}
