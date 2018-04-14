import {Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { HistoriaClinicaComponent } from './historiaClinica.component';
// import {ProxCitaComponent} from './proxcita.component';

import { VisitaService } from '../services/visita.service';
import { PacienteService } from '../services/paciente.service';


@Component({
  selector: 'datatable',
  templateUrl:'../views/datatable.html',
  styleUrls: ['../css/datatable.css'],
})
export class DatatableComponent { 
  
  public visitas:any=[];
  public seguro:Boolean=false;
  public cita:any=[];

  @Input() set fecha(value: string){
    this.getVisitasDelDia(value)
  }

  constructor(  private visitaService:VisitaService, 
                private pacienteService:PacienteService, 
                public dialog: MatDialog){
  }

  getVisitasDelDia(dia){
    this.visitaService.getVisitasXFecha(dia).subscribe(result=>{
      console.log(result);
      
      this.visitas=result.sort(function(a,b) {return (a.hora > b.hora) ? 1 : ((b.hora > a.hora) ? -1 : 0);} );
      this.visitas.forEach(v => {
          this.pacienteService.getPaciente(v.paciente).subscribe(pac=>{
            v.paciente=pac;
          })
      })
    })
  }

  // Acciones
  openHisCliDialog(P){
    let dialogRef = this.dialog.open(HistoriaClinicaComponent);
    dialogRef.componentInstance.paciente =P;
  }
  // // Agendar Cita
  // editVisita(V){
  //   let dialogRef = this.dialog.open(ProxCitaComponent);
  //   dialogRef.componentInstance.paciente=V.paciente;
  //   dialogRef.componentInstance.visita=V;
  //   dialogRef.componentInstance.editFlag=true;
  // }

// Eliminar alguna visita
  // seguroDelVisita(V){
  //   this.cita=V;
  //   this.seguro=true;
  // }
  // noDelVisita(){
  //   this.seguro=false;
  // }
  // siDelVisita(){
  //   this.visitaService.deleteVisita(this.cita.id);
  //   console.log('Visita eliminada: ' + this.cita.id);
  //   this.seguro=false;
  // }

// FIN

}