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
  user_contact : string;
  type_user_name : string;
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
    this.user_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {
    if(!(this.type_user_name == "livreur" && this.token != undefined)){
      this.router.navigate(['/livreur-bo/login']);
    }else{
      this.avoirCommande();
    }
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
        alert(data.data);
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
        alert(data.data);
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
        alert(data.data);
      }else{
        //use cookie there
        commande.etat = 30;
        this.MesCommandes = this.MesCommandes.filter((item:any)=> item != commande);
        
      }
    });
  }

}
