import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

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

  loginClient(email:string, pwd:string) {
    let postData = {
        "email": email,
        "password": pwd
    }
    return this.http.post(`${baseUrl}/auth/client/login`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  loginResto(email:string, pwd:string) {
    let postData = {
        "email": email,
        "password": pwd
    }
    return this.http.post(`${baseUrl}/auth/resto/login`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  loginResponsable(email:string, pwd:string) {
    let postData = {
        "email": email,
        "password": pwd
    }
    return this.http.post(`${baseUrl}/auth/responsable/login`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  loginLivreur(email:string, pwd:string) {
    let postData = {
        "email": email,
        "password": pwd
    }
    return this.http.post(`${baseUrl}/auth/livreur/login`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  generateInscriptionCode(email:string, name:string){
    let postData = {
        "email": email,
        "name": name
    }
    return this.http.post(`${baseUrl}/auth/client/generateInscriptionCode`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

  inscription(name:string, email:string, password:string, contact:string, code:string){
    let postData = {
        "name":name, 
        "email":email, 
        "password":password, 
        "contact":contact, 
        "code":code
    }
    return this.http.post(`${baseUrl}/auth/client/inscription`, postData, {
        headers: new HttpHeaders({
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        })
    });
  }

}
