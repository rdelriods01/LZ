import {Component, Input} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HistoriaClinicaComponent } from './historiaClinica.component';

import { VisitaService } from '../services/visita.service';

@Component({
  selector: 'datatable',
  templateUrl:'../views/datatable.html',
  styleUrls: ['../css/datatable.css'],
})
export class DatatableComponent{ 
  
  public filteredList:any=[];
  public visitas:any=[];
  public errorMessage:any;

  @Input() fecha:string;

  constructor( private visitaService:VisitaService, public dialog: MdDialog){
      this.getVisitas();
  }
  getVisitas(){
      this.visitaService.getVisitas().subscribe(
        (result: FirebaseListObservable<any>)=>{
          this.visitas=result;
          if(!this.visitas){alert('Error en el servidor');}
        },
        error =>{
          this.errorMessage = <any>error;
          if (this.errorMessage != null){
              console.log(this.errorMessage);
          }
        }
      );
  }
  filter(){
    return this.filteredList=this.filterByProperty(this.visitas,"fecha",this.fecha);
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
  sendPaciente(x:any){
    // CONST.miPacienteActual=x;
  }

// FIN

}