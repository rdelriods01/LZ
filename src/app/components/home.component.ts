import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';

import { Paciente } from '../models/paciente';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  styleUrls: ['../css/home.css']
})
export class HomeComponent {

  public paciente:Paciente;
  public pacientes:any;
  public idP:String;

  constructor(private authService: AuthService,
              private af: AngularFire,
              private pacienteService:PacienteService) {

    this.paciente = new Paciente('','','','','','',{calle:'',colonia:'',ciudad:''},'','','','','','','','',false);
    this.getPacientes();
  }

  getPacientes(){
    this.pacienteService.getPacientes().subscribe((pacs: FirebaseListObservable<any>)=>{
      this.pacientes=pacs;
    });
  }
  sendPaciente(){
    this.pacienteService.savePaciente(this.paciente);
    // this.paciente.id=this.pacienteService.idP;
    // this.pacienteService.updatePaciente(this.paciente.id,this.paciente);
  }

  enviarID(x:any){
    console.log(x);
  }
}