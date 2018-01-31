import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
// Import de ChartJS
import { ChartsModule } from 'ng2-charts';

// configuracion necesaria para Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyA78Lla-odvclSMvdIZnWE_lrwK4556DcQ",
    authDomain: "lightzone-c9d48.firebaseapp.com",
    databaseURL: "https://lightzone-c9d48.firebaseio.com",
    projectId: "lightzone-c9d48",
    storageBucket: "lightzone-c9d48.appspot.com",
    messagingSenderId: "326970238930"
  };

// Imports de los Services
import { AuthService } from './services/auth.service';
import { PacienteService } from './services/paciente.service';
import { VisitaService } from './services/visita.service';

// Imports de los Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { LayoutComponent } from './components/layout.component';
import { DashboardComponent } from './components/dashboard.component';
import { DatatableComponent } from './components/datatable.component';
import { HomeComponent } from './components/home.component';
import { PacientesComponent } from './components/pacientes.component';
import { PerfilPacienteComponent } from './components/perfilPaciente.component';
import { NewPacienteComponent } from './components/newPaciente.component';
import { FlatpickerComponent } from './components/flatpicker.component';
import { HistoriaClinicaComponent } from './components/historiaClinica.component';
import { ConsultarComponent } from './components/consultar.component';
import { ProxCitaComponent } from './components/proxcita.component';

// Configuracion de las Rutas
const routes: Routes = [
  { path:'', component: DashboardComponent },
  { path:'home', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'pacientes', component: PacientesComponent},
  { path:'paciente/:id', component: PerfilPacienteComponent},

  { path:'**', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    DatatableComponent,
    HomeComponent,
    NewPacienteComponent,
    FlatpickerComponent,
    PacientesComponent,
    PerfilPacienteComponent,
    HistoriaClinicaComponent,
    ConsultarComponent,
    ProxCitaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, 'LIGHTZONE'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    ChartsModule
    ],
  providers: [
    AuthService,
    PacienteService,
    VisitaService
  ],
  bootstrap: [AppComponent],
  entryComponents:[NewPacienteComponent,HistoriaClinicaComponent,ConsultarComponent,ProxCitaComponent]
})
export class AppModule { }
