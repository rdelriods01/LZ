import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// Import de ChartJS
import { ChartsModule } from 'ng2-charts';
// Imports de Material
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

// configuracion necesaria para Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
import { MenusComponent } from './components/menus.component';
import { AddPlatillosComponent } from './components/addPlatillos.component';
import { PlatillosComponent } from './components/Platillos.component';


// Configuracion de las Rutas
const routes: Routes = [
  { path:'', component: DashboardComponent },
  { path:'home', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'pacientes', component: PacientesComponent},
  { path:'paciente/:id', component: PerfilPacienteComponent},
  { path:'platillos', component: PlatillosComponent},

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
    ProxCitaComponent,
    MenusComponent,
    AddPlatillosComponent,
    PlatillosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, 'LIGHTZONE'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatButtonModule,MatDialogModule,
    ChartsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
    ],
  providers: [
    AuthService,
    PacienteService,
    VisitaService
  ],
  bootstrap: [AppComponent],
  entryComponents:[NewPacienteComponent,HistoriaClinicaComponent,ConsultarComponent,ProxCitaComponent,AddPlatillosComponent]
})
export class AppModule { }
