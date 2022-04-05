import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/Authentification/login/login.component";
import { InscriptionComponent } from "./pages/Authentification/inscription/inscription.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommandeComponent } from "./pages/commande/commande.component";
import { DetailCommandeComponent } from "./pages/detail-commande/detail-commande.component";
import { LoginRestoComponent } from "./pages/RestaurantBO/login-resto/login-resto.component";
import { HomeRestoComponent } from "./pages/RestaurantBO/home-resto/home-resto.component";
import { CommandeRestoComponent } from "./pages/RestaurantBO/commande-resto/commande-resto.component";
import { LoginEkalyComponent } from "./pages/EkalyBO/login-ekaly/login-ekaly.component";
import { HomeEkalyComponent } from "./pages/EkalyBO/home-ekaly/home-ekaly.component";
import { LoginLivreurComponent } from "./pages/LivreurBO/login-livreur/login-livreur.component";
import { HomeLivreurComponent } from "./pages/LivreurBO/home-livreur/home-livreur.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'detail_commande', component: DetailCommandeComponent },
  { path: 'resto-bo/login', component: LoginRestoComponent },
  { path: 'resto-bo/home', component: HomeRestoComponent },
  { path: 'resto-bo/commande', component: CommandeRestoComponent },
  { path: 'ekaly-bo/login', component: LoginEkalyComponent },
  { path: 'ekaly-bo/home', component: HomeEkalyComponent },
  { path: 'livreur-bo/login', component: LoginLivreurComponent },
  { path: 'livreur-bo/home', component: HomeLivreurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
