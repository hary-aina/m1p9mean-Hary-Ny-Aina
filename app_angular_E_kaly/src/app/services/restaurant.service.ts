import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) { }

  //|---------------------------|
  //|----- ressource plat ------|
  //|---------------------------|

  getPlatByrestoOwner(token:string, resto_id:string, per_page:Number, page_number:Number) {
    return this.http.get(`${baseUrl}/restaurant/plat/voirPlat/${resto_id}/${per_page}/${page_number}?token=${token}`);
  }

  makeVisible(token:string, resto_id:string, plat_id:string){
    let postData = {
      "token":token,
      "resto_id":resto_id
    }
    return this.http.put(`${baseUrl}/restaurant/plat/setVisible/${plat_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  makeInVisible(token:string, resto_id:string, plat_id:string){
    let postData = {
      "token":token,
      "resto_id":resto_id
    }
    return this.http.put(`${baseUrl}/restaurant/plat/setInvisible/${plat_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }
  
  //|-------------------------------|
  //|----- fin ressource plat ------|
  //|-------------------------------|

  //|-------------------------------------|
  //|-------- resource comande -----------|
  //|-------------------------------------|

  getComandeValider(token:string, resto_id:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/restaurant/commande/voirCommande/${resto_id}/${per_page}/${page_number}?token=${token}`);
  }

  startCommandePreparation(token:string, commande_id:string){
    let postData = {
      "token":token
    }
    return this.http.put(`${baseUrl}/restaurant/commande/setStart/${commande_id}`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });  
  }

  setCommandeReady(token:string, commande_id:string){
    let postData = {
      "token":token
    }
    return this.http.put(`${baseUrl}/restaurant/commande/setReady/${commande_id}`, postData, {
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
