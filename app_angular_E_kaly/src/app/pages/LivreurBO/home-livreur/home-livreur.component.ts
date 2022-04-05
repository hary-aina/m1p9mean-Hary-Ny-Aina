import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LivreurService } from 'src/app/services/livreur.service';

@Component({
  selector: 'app-home-livreur',
  templateUrl: './home-livreur.component.html',
  styleUrls: ['./home-livreur.component.css']
})
export class HomeLivreurComponent implements OnInit {

  MesCommandes : any = [];

  user_name : string;
  user_id : string;
  token : string;

  per_page = 10;
  page_number = 1;

  constructor(
    private livreurService : LivreurService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.token = this.cookie.get('token');  
    this.user_name = this.cookie.get('user_name');
    this.user_id = this.cookie.get('user_id');
   }

  ngOnInit(): void {
    this.avoirCommande();
  }

  avoirCommande(){
    let result = this.livreurService.getComandeReadyByDeliver(
      this.token, 
      this.user_id,
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

  demmarerLivraison(commande : any){
    let result = this.livreurService.demmarerLivraison(this.token, commande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        commande.etat = 25;
        
      }
    });
  }

  cloturerLivraison(commande : any){
    let result = this.livreurService.cloturerLivraison(this.token, commande._id);
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert("lors de la mise a jour de la commande");
      }else{
        //use cookie there
        commande.etat = 30;
        this.MesCommandes = this.MesCommandes.filter((item:any)=> item != commande);
        
      }
    });
  }

}
