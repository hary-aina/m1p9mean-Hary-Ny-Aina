import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { EkalyService } from 'src/app/services/ekaly.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-to-deliver',
  templateUrl: './commande-to-deliver.component.html',
  styleUrls: ['./commande-to-deliver.component.css']
})
export class CommandeToDeliverComponent implements OnInit {

  user_name : string;
  user_id : string;
  user_contact : string;
  token : string;
  type_user_name : string;

  per_page = 10;
  page_number = 1;

  commandes : any[]= [];

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
    this.getCommandePretALivrer();
  }

  getCommandePretALivrer(){
    let result = this.ekalyService.getCommandeToDeliver(this.token, this.per_page, this.page_number);
    result.subscribe((data:any) => {
      if(data.status != 200){
        alert("erreur lors du cosulation du serveur");
      }else{
        //use cookie there
        this.commandes = data.data;
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

}
