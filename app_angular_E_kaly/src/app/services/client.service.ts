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

}
