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
          MatInputModule, MatFormFieldModule, MatSidenavModule, MatListModule,
          MatExpansionModule, MatPaginatorModule, MatSortModule,MatTabsModule,
          MatDatepickerModule, MatNativeDateModule, MatDialogModule,MatSelectModule
    } from '@angular/material';

// Servicios ==========================
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { PacienteService } from './services/paciente.service';
import { VisitaService } from './services/visita.service';

// Componentes ========================
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { ConfigComponent } from './components/config.component';
import { LayoutComponent } from './components/layout.component';
import { DashboardComponent } from './components/dashboard.component';
import { TestComponent } from './components/test.component';
import { NewPacienteComponent } from './components/newPaciente.component';
import { PacientesComponent } from './components/pacientes.component';
import { FlatpickerComponent } from './components/flatpicker.component';

// Rutas =============================
const routes: Routes = [
  { path:'', component: LayoutComponent ,children:[
    { path:'', component: DashboardComponent},
    { path:'config', component: ConfigComponent },
    { path:'test', component: TestComponent },
    { path:'pacientes', component: PacientesComponent},
  ]},
  { path:'login', component: LoginComponent},
   
  // { path:'paciente/:id', component: PerfilPacienteComponent},
  // { path:'platillos', component: PlatillosComponent},
  { path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigComponent,
    LayoutComponent,
    DashboardComponent,
    TestComponent,
    NewPacienteComponent, 
    PacientesComponent,
    FlatpickerComponent
  ],
  entryComponents:[
    NewPacienteComponent
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
    MatSidenavModule, MatListModule, MatExpansionModule, MatPaginatorModule, MatSortModule, MatTabsModule,
    MatDatepickerModule, MatNativeDateModule,MatDialogModule, MatSelectModule
  ],
  providers: [
    AuthService,
    ConfigService,
    PacienteService,
    VisitaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
