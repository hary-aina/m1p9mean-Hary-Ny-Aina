import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EkalyService } from 'src/app/services/ekaly.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {

  user_name : string;
  user_id : string;
  user_contact : string;
  token : string;
  type_user_name : string;

  per_page = 10;
  page_number = 1;

  showDropInput = 0;
  commandes : any[] = [];
  livreurs : any[] = [];
  
  livreurSelected : any;

  constructor(
    private ekalyService : EkalyService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.user_name = this.cookie.get('user_name');
    this.user_id = this.cookie.get('user_id');
    this.user_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {
    this.avoirLiveur();
  }

  avoirLiveur(){
    let result = this.ekalyService.getLivreurWithNbCommandeToDelivery(this.token, this.per_page, this.page_number);
    result.subscribe((data:any) => {
      if(data.status != 200){
        alert("erreur lors du cosulation du serveur");
      }else{
        //use cookie there
        this.livreurs = data.data;
        //console.log(this.MesCommandes);
      }
    });
  }

  drop(event:CdkDragDrop<any[]>){
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  letsAsignateCommande(livreur : any){
    this.livreurSelected = livreur;
    this.commandes = [];
    this.showDropInput = 1;
  }

  undpoAsignateCommande(){
    this.livreurSelected = null;
    this.commandes = [];
    this.showDropInput = 0;
  }

  

}
