import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { HistoriaClinicaComponent } from './historiaClinica.component';
import {ProxCitaComponent} from './proxcita.component';

import { VisitaService } from '../services/visita.service';
import { PacienteService } from '../services/paciente.service';


@Component({
  selector: 'datatable',
  templateUrl:'../views/datatable.html',
  styleUrls: ['../css/datatable.css'],
})
export class DatatableComponent{ 
  
  public filteredList:any=[];
  public visitas:any=[];
  public errorMessage:any;
  public pacientes:any=[];
  public seguro:Boolean=false;
  public cita:any=[];

  @Input() fecha:string;

  constructor( private visitaService:VisitaService, private pacienteService:PacienteService, public dialog: MatDialog){
  }

  ngOnInit(){
    this.getVisitas();
  }

  getVisitas(){
      this.visitaService.getVisitas().subscribe(
        (result: FirebaseListObservable<any>)=>{
          this.visitas=result;
          if(!this.visitas){alert('Error en el servidor de visitas');}
          this.getPacientes();
        },
        error =>{
          this.errorMessage = <any>error;
          if (this.errorMessage != null){
              console.log(this.errorMessage);
          }
        }
      );
  }

  getPacientes(){
    this.pacienteService.getPacientes().subscribe(
      (result: FirebaseListObservable<any>)=>{
        this.pacientes=result;
        if(!this.pacientes){alert("Error en el servidor de pacientes")}
        this.filter();
      },
      error=>{
        this.errorMessage = <any>error;
        if (this.errorMessage != null){
            console.log(this.errorMessage);
        }
      }
    );
  }
  
  filter(){
    // filtrar las visitas del día de hoy
    this.filteredList=this.filterByProperty(this.visitas,"fecha",this.fecha);
    // buscar los pacientes que tengan en el id el idPaciente que tiene la visita
   
    for(let i=0;i<this.pacientes.length;i++){
      for(let j=0;j<this.filteredList.length;j++){
        if(this.pacientes[i].id==this.filteredList[j].paciente){
          this.filteredList[j].paciente=this.pacientes[i];
        }
      }
    }
    return this.filteredList;
  }
    
  filterByProperty(array, prop, value){
      var filtered = [];
      var filtrado = [];
      for(var i = 0; i < array.length; i++){
          var obj = array[i];
          if(obj[prop].toLowerCase().indexOf(value)>=0){
              filtered.push(obj);
          }
      }
      // sort by hora
      filtrado=filtered.sort(function(a,b) {return (a.hora > b.hora) ? 1 : ((b.hora > a.hora) ? -1 : 0);} );
      return filtrado;
  }
// Acciones
  openHisCliDialog(P){
    let dialogRef = this.dialog.open(HistoriaClinicaComponent);
    dialogRef.componentInstance.paciente =P;
  }
  // Agendar Cita
  editVisita(V){
    let dialogRef = this.dialog.open(ProxCitaComponent);
    dialogRef.componentInstance.paciente=V.paciente;
    dialogRef.componentInstance.visita=V;
    dialogRef.componentInstance.editFlag=true;
  }

// Eliminar alguna visita
  seguroDelVisita(V){
    this.cita=V;
    this.seguro=true;
  }
  noDelVisita(){
    this.seguro=false;
  }
  siDelVisita(){
    this.visitaService.deleteVisita(this.cita.id);
    console.log('Visita eliminada: ' + this.cita.id);
    this.seguro=false;
  }

// FIN

}