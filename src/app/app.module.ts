import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
// configuracion necesaria para Firebase
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyA78Lla-odvclSMvdIZnWE_lrwK4556DcQ",
    authDomain: "lightzone-c9d48.firebaseapp.com",
    databaseURL: "https://lightzone-c9d48.firebaseio.com",
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
import { HomeComponent } from './components/home.component';
import { NewPacienteComponent } from './components/newPaciente.component';
import { FlatpickerComponent } from './components/flatpicker.component';

// Configuracion de las Rutas
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // {path:'**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    NewPacienteComponent,
    FlatpickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, 'LIGHTZONE'),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    PacienteService,
    VisitaService
  ],
  bootstrap: [AppComponent],
  entryComponents:[NewPacienteComponent]
})
export class AppModule { }
