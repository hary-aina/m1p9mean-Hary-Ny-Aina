import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  constructor(private http : HttpClient) { }

    //|-------------------------------------|
  //|-------- resource comande -----------|
  //|-------------------------------------|

  getComandeReadyByDeliver(token:string, livreur_id:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/livreur/commande/voirCommande/${livreur_id}/${per_page}/${page_number}?token=${token}`);
  }

  demmarerLivraison(token:string, commande_id:string){
    let postData = {
      "token":token
    }
    return this.http.put(`${baseUrl}/livreur/commande/demarrer_livraison/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });  
  }

  cloturerLivraison(token:string, commande_id:string){
    let postData = {
      "token":token
    }
    return this.http.put(`${baseUrl}/livreur/commande/cloturer_livraison/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });  
  }

  //|-----------------------------------------|
  //|-------- fin resource comande -----------|
  //|-----------------------------------------|

}
