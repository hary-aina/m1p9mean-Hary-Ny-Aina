import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl, tokenApp } from 'src/environments/environment';

export class Personne {
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient) { }

  login(email:string, pwd:string) {
    let postData = {
        "email": email,
        "password": pwd
    }
    return this.http.post(`${baseUrl}/auth/login`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    })
}

}
