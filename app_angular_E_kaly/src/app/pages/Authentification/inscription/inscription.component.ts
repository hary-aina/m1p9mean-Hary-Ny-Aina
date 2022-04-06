import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  nom : string;
  email: string;
  password : string;
  contact : string;
  code : string;

  error : any = {
    error : "",
    nom : "",
    email: "",
    password : "",
    contact : "",
    code : ""
  };

  confirmation : Number;

  constructor(
    private authentificationService:AuthentificationService
  ) { 
    this.nom = "";
    this.email = "";
    this.password = "";
    this.contact = "";
    this.code = "";
    this.confirmation = 0;
  }

  ngOnInit(): void {
  }

  continue(){
    this.error.error = "";
    this.error.email = "";
    this.error.password = "";
    this.error.nom = "";
    this.error.contact = "";
    if (this.password == '' || this.email == '' || this.nom == '' || this.contact == '') {
        this.error.email = (this.email == '') ? 'Ce champ est obligatoire' : '';
        this.error.password = (this.password == '') ? 'Ce champ est obligatoire' : '';
        this.error.nom = (this.nom == '') ? 'Ce champ est obligatoire' : '';
        this.error.contact = (this.contact == '') ? 'Ce champ est obligatoire' : '';
    } 
    else {
      //generate code and send to mail
      let result = this.authentificationService.generateInscriptionCode(this.email, this.nom);
      result.subscribe((data:any) => {
        //console.log(data);
        if(data.status != 200){
          this.error.error = "erreur lors du traitement serveur";
        }else{
          this.confirmation = 1;
        }
      });
    }
  }

  inscription(){
    this.error.code = "";
    if (this.code == '') {
      this.error.code = (this.code == '') ? 'Ce champ est obligatoire' : '';
    } 
    else {
      let result = this.authentificationService.inscription(this.nom, this.email, this.password, this.contact, this.code);
      result.subscribe((data:any) => {
        //console.log(data);
        if(data.status != 200){
          this.error.error = "erreur lors du traitement serveur";
          this.error.code = data.data;
        }else{
          this.confirmation = 2;
        }
      });
    }
  }

}
