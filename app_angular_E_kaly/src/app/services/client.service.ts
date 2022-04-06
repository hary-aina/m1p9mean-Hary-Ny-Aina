import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  getPlat(per_page:Number, page_number:Number) {
    return this.http.get(`${baseUrl}/client/plat/listePlat/${per_page}/${page_number}`);
  }

  getPlatByRestaurant(restaurant_id:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/client/plat/voirPlat/${restaurant_id}/${per_page}/${page_number}`);
  }

  searchPlat(searchPlat:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/client/plat/searchPlat/${searchPlat}/${per_page}/${page_number}`);
  }

  updateOrdre(token:string, commande_id:string, prix_global:string, detail_commande:any, lieu_adresse_livraison:string, client_contact:string){
    let postData = {
      "token":token,
      "prix_global":prix_global, 
      "detail_commande":detail_commande, 
      "lieu_adresse_livraison":lieu_adresse_livraison, 
      "client_contact":client_contact 
    }
    return this.http.put(`${baseUrl}/client/commande/modifier/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
  }

  makeOrdre(token:string, restaurant_id:string, restaurant_name:string, prix_global:number, client_id:string, client_name:string, client_contact:string, date_comande:string, lieu_adresse_livraison:string, detail_commande:any){
      let postData = {
        "token":token,
        "restaurant_id": restaurant_id,
        "restaurant_name": restaurant_name,
        "prix_global": prix_global, 
        "client_id": client_id, 
        "client_name": client_name, 
        "client_contact": client_contact, 
        "date_comande": date_comande, 
        "lieu_adresse_livraison":lieu_adresse_livraison, 
        "detail_commande":detail_commande
    }
    return this.http.post(`${baseUrl}/client/commande/ajout`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
  }

  getCommande(token:string, client_id:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/client/commande/voirCommande/${client_id}/${per_page}/${page_number}?token=${token}`);
  }

  validateOrdre(token:string, commande_id:string){
    let postData = {
      "token":token 
    }
    return this.http.put(`${baseUrl}/client/commande/valider/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
  }

  annulerOrdre(token:string, commande_id:string){
    let postData = {
      "token":token 
    }
    return this.http.put(`${baseUrl}/client/commande/annuler/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
  }

}
