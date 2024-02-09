import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { PageNoutFoundComponent } from './page-nout-found/page-nout-found.component';
import { AffichageRendezvousComponent } from './employe/affichage-rendezvous/affichage-rendezvous.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileEmployeComponent } from './employe/profile-employe/profile-employe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './common/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RdvCardComponent } from './common/rdv-card/rdv-card.component';

@NgModule({
    declarations: [
        AppComponent,
        InscriptionComponent,
        LoginComponent,
        PageNoutFoundComponent,
        AffichageRendezvousComponent,
        ProfileEmployeComponent,
        NavbarComponent,
        HomeComponent,
        RdvCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullCalendarModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
