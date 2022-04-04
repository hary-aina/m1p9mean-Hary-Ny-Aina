import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/Authentification/login/login.component";
import { InscriptionComponent } from "./pages/Authentification/inscription/inscription.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommandeComponent } from "./pages/commande/commande.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'commande', component: CommandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
