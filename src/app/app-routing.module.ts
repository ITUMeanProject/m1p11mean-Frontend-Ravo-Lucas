import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PageNoutFoundComponent } from './page-nout-found/page-nout-found.component';
import { AffichageRendezvousComponent } from './employe/affichage-rendezvous/affichage-rendezvous.component';
import { ProfileEmployeComponent } from './employe/profile-employe/profile-employe.component';

const routes : Routes = [
    {path : '', component:LoginComponent},

    {path : 'login', component:LoginComponent},
    {path : 'inscription', component:InscriptionComponent},
    {path : 'employe/profile', component:ProfileEmployeComponent},
    {path : 'employe/rendezvous', component:AffichageRendezvousComponent},
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
