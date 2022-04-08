import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EkalyService {

  constructor(private http : HttpClient) { }

  getCommandeToDeliver(token:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/responsable_E_kaly/commande/voirCommandePretaLiver/${per_page}/${page_number}?token=${token}`);
  }

  getLivreurWithNbCommandeToDelivery(token:string, per_page:Number, page_number:Number){
    return this.http.get(`${baseUrl}/responsable_E_kaly/livreur/getLivreurWithNbCommandeToDeliver/${per_page}/${page_number}?token=${token}`);
  }

  asignLivraison(token:string, commande_array:any[], livreur_id:string, livreur_name:string){
    let postData = {
      "token" : token,
      "commande_array" : commande_array,
      "livreur_id" : livreur_id, 
      "livreur_name" : livreur_name
    }
    return this.http.post(`${baseUrl}/responsable_E_kaly/commande/asignLivraison`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
  }

  //dashboard
  getdashboard(token:string){
    return this.http.get(`${baseUrl}/responsable_E_kaly/commande/dashboard?token=${token}`);
  }

}
