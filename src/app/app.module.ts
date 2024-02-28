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
import { AccueilComponent } from './accueil/accueil.component';
import { ImageService } from './services/images/image.service';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { StatistiqueComponent } from './manager/statistique/statistique.component';
import { ChartsModule } from 'ng2-charts';
import { ManagerGestionDepenseComponent } from './manager/manager-gestion-depense/manager-gestion-depense.component';
<<<<<<< HEAD
import { HistoriqueComponent } from './client/historique/historique.component';
=======
import { FooterComponent } from './common/footer/footer.component';

>>>>>>> 075240d1ba444e8fdf70fc1c813814dacdf80869

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
        AccueilComponent,
        HeaderComponent,
        FooterComponent,
        StatistiqueComponent,
        ManagerGestionDepenseComponent,
<<<<<<< HEAD
        HistoriqueComponent
=======
        FooterComponent
>>>>>>> 075240d1ba444e8fdf70fc1c813814dacdf80869
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
        },
        [ImageService]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
