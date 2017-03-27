import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
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

// Configuracion de las Rutas
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];
// Imports de los Services
import { AuthService } from './services/auth.service';

// Imports de los Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
