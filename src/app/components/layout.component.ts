import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { PacienteService } from '../services/paciente.service';

import { MatDialog } from '@angular/material';

import { NewPacienteComponent } from './newPaciente.component';


@Component({
  selector: 'layoutC',
  templateUrl: '../views/layout.html',
  styleUrls: ['../css/layout.css']
})
export class LayoutComponent {
  
  pacientes:any=[];

// Variables para el buscador 
  visible:Boolean=false;
  showBtn: string ='ocultarB';
  showRes: string ='hideResultado';
  showItm: string ='hideResItem';
  buscado = "";
  filteredList:any;
 


  constructor(public auth: AuthService, 
              public conf: ConfigService, 
              public pacser: PacienteService,
              public router: Router,
              public dialog: MatDialog) 
  {
    this.getPacientes();
  }

  getPacientes(){
    this.pacser.getPacientes().subscribe(pacs=>{
      console.log(pacs);
      this.pacientes=pacs;
    })
  }

  // Funciones para la vista del buscador
  toggleBuscar(inputSearch){
    console.log(this.pacientes);

    this.visible = !this.visible;
    this.showBtn = this.visible ? 'mostrarB' : 'ocultarB ';
    if(this.visible){inputSearch.focus()}
  }
  showResBus(){
    this.showRes='showResultado';
    this.showItm='showResItem';
  }
  resetQuery(){
    this.buscado="";
  }
  hideResBus(){
    this.showRes='hideResultado';
    this.showItm='hideResItem';
    this.showBtn='ocultarB';
    this.visible=false;
    this.resetQuery();
  }
// Funciones para buscar en el buscador
  filter(){
    this.filteredList=this.filterByProperty(this.pacientes ,"nombre",this.buscado.toLowerCase());
  }
  filterByProperty(array, prop, value){
      var filtered = [];
      for(var i = 0; i < array.length; i++){
          var obj = array[i];
          if(obj[prop].toLowerCase().indexOf(value)>=0){
                    filtered.push(obj);
          }
      }   
      return filtered;
  }
  
  newPaciente(){
    console.log('Aun no hace nada el boton pero jala chido jjjj');
    let dialogRef = this.dialog.open(NewPacienteComponent);
  }
}
