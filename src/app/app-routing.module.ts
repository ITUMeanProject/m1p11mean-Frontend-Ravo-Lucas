import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PageNoutFoundComponent } from './page-nout-found/page-nout-found.component';
import { AffichageRendezvousComponent } from './employe/affichage-rendezvous/affichage-rendezvous.component';
import { ProfileEmployeComponent } from './employe/profile-employe/profile-employe.component';
import { HomeComponent } from './home/home.component';
import { SuiviDesTachesComponent } from './employe/suivi-des-taches/suivi-des-taches.component';
import { SuiviDesTachesDetailsComponent } from './employe/suivi-des-taches-details/suivi-des-taches-details.component';
import { LoginEmployeComponent } from './employe/login-employe/login-employe.component';
import { EmpAuthGuard } from './guard/emp-auth.guard';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { ManagerAuthGuard } from './guard/manager-auth.guard';
import { ManagerGestionEmployeComponent } from './manager/manager-gestion-employe/manager-gestion-employe.component';
import { ManagerGestionServiceComponent } from './manager/manager-gestion-service/manager-gestion-service.component';
import { StatistiqueComponent } from './manager/statistique/statistique.component';
import { ManagerGestionDepenseComponent } from './manager/manager-gestion-depense/manager-gestion-depense.component';

const routes : Routes = [
    {path : '', component:LoginComponent},

    {path : 'login', component:LoginComponent},
    {path : 'inscription', component:InscriptionComponent},
    {
        path : 'employe',
        canActivate: [EmpAuthGuard],
        children: [
            {path : 'profile', component:ProfileEmployeComponent},
            {path : 'rendezvous', component:AffichageRendezvousComponent},
            {path : 'suividetache', component:SuiviDesTachesComponent},
            {path : 'suividetachedetails', component:SuiviDesTachesDetailsComponent}
        ]
    },
    {
        path : 'manager',
        canActivate: [ManagerAuthGuard],
        children: [
            {path : 'statistiques', component:StatistiqueComponent},
            {path : 'gestionemploye', component:ManagerGestionEmployeComponent},
            {path : 'gestionservices', component:ManagerGestionServiceComponent},
            {path : 'gestiondepenses', component:ManagerGestionDepenseComponent},
        ]
    },
    {path : 'manager/login', component:ManagerLoginComponent},
    {path : 'employe/login', component:LoginEmployeComponent},
    {path : 'home', component: HomeComponent},
    {path : '**', component:PageNoutFoundComponent}
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule { }
