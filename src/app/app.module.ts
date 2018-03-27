import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Firebase ====================
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Angular Material ====================
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, 
          MatInputModule, MatFormFieldModule, MatSidenavModule, MatListModule
    } from '@angular/material';

// Servicios ==========================
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { PacienteService } from './services/paciente.service';

// Componentes ========================
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { LayoutComponent } from './components/layout.component';
import { DashboardComponent } from './components/dashboard.component';
import { PacientesComponent } from './components/pacientes.component';

// Rutas =============================
const routes: Routes = [
  { path:'', component: AppComponent },
  { path:'dashboard', component: DashboardComponent},
  { path:'pacientes', component: PacientesComponent},
  // { path:'paciente/:id', component: PerfilPacienteComponent},
  // { path:'platillos', component: PlatillosComponent},
  { path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    PacientesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    // Material
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,MatInputModule, MatFormFieldModule,
    MatSidenavModule, MatListModule
  ],
  providers: [
    AuthService,
    ConfigService,
    PacienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
