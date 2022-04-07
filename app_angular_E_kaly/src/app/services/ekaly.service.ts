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

}
