import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { VisitaService } from '../services/visita.service';

import { Paciente } from '../models/paciente';
import { Visita } from '../models/visita';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  styleUrls: ['../css/home.css']
})
export class HomeComponent {

  public paciente:Paciente;
  public visita:Visita;
  public pacientes:any;
  public visitas:any=[];
  public idP:String;
  public errorMessage: any;
  
  constructor(private authService: AuthService,
              private af: AngularFireDatabase,
              private pacienteService:PacienteService,
              private visitaService:VisitaService) {

    this.paciente = new Paciente('','','','','','',{calle:'',colonia:'',ciudad:''},'','','','','','','','','','','',false);
    this.visita=new Visita('',0,'','',0,0,0,0,0,0,'','',false,this.paciente.id,{desayuno:[],comida:[],cena:[],snack:[]},false);
    this.getPacientes();
  }

  getPacientes(){
    this.pacienteService.getPacientes().subscribe(
            (result) =>{
                this.pacientes=result;
                if(!this.pacientes){alert('Error en el servidor')}
                else{
                    this.pacientes=this.pacientes.sort(function(a,b) {return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);} );                   
                 }
            },
            error =>{
                this.errorMessage = <any>error;
                if (this.errorMessage != null){
                    console.log(this.errorMessage);
                }
            }
        );
  }
  sendPaciente(){
    this.pacienteService.savePaciente(this.paciente);
  }

  agregarCita(idP:any){
    let time = new Date();
    let hr=time.getHours();
    let mins=time.getMinutes(); 
    this.visita.hora=(hr+':'+mins);
    this.visita.paciente=this.pacienteService.getPaciente(idP);
    this.visitaService.saveVisita(this.visita);
  }

  enviarID(x:any){
        this.visita.paciente=this.pacienteService.getPaciente(x);
        this.visitas=this.visitaService.getVisitasP();
        return this.visitas;
  }

  eV(x:any){
    this.visitaService.deleteVisita(x);
  }
}