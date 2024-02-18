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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RdvCardComponent } from './common/rdv-card/rdv-card.component';
import { SuiviDesTachesComponent } from './employe/suivi-des-taches/suivi-des-taches.component';
import { SuiviDesTachesDetailsComponent } from './employe/suivi-des-taches-details/suivi-des-taches-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginEmployeComponent } from './employe/login-employe/login-employe.component';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { ManagerGestionEmployeComponent } from './manager/manager-gestion-employe/manager-gestion-employe.component';
import { ManagerGestionServiceComponent } from './manager/manager-gestion-service/manager-gestion-service.component';
import { StatistiqueComponent } from './manager/statistique/statistique.component';
import { ChartsModule } from 'ng2-charts';

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
        RdvCardComponent,
        SuiviDesTachesComponent,
        SuiviDesTachesDetailsComponent,
        LoginEmployeComponent,
        ManagerLoginComponent,
        ManagerGestionEmployeComponent,
        ManagerGestionServiceComponent,
        StatistiqueComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullCalendarModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DragDropModule,
        ChartsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
