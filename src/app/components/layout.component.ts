import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'layoutC',
  templateUrl: '../views/layout.html',
  styleUrls: ['../css/layout.css']
})
export class LayoutComponent {
  
  // pacientes=[
  //   {nombre:'Benito Juarez'},
  //   {nombre:'Jose Ma Morelos'},
  //   {nombre:'Nezahualcoyotl'},
  //   {nombre:'Sor Juana Ines de la Cruz'},
  //   {nombre:'Diego Rivera'},
  //   {nombre:'Miguel Hidalgo'}
  // ]
  pacientes:any=[];

// Variables para el buscador 
  visible:Boolean=false;
  showBtn: string ='ocultarB';
  showRes: string ='hideResultado';
  showItm: string ='hideResItem';
  buscado = "";
  filteredList:any;
paci:any;
 


  constructor(public auth: AuthService, public conf: ConfigService , public pacser: PacienteService, public router: Router) 
  {
    this.router.navigate(['dashboard']);
    this.getPacientes();
  }

  getPacientes(){
    this.pacser.getPacientes().subscribe(pacs =>{
      console.log(pacs);
      this.pacientes= pacs;
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

  
agregarPaciente(n,e){
  let PAC = {nombre:n,edad:e}
  this.pacser.savePaciente(PAC);
}

showIdP(idP){
  this.pacientes.forEach(el => {
    if(el.id == idP){this.paci=el}
  });
  console.log(this.paci);
}

deleteP(idP){
  this.pacser.deletePaciente(idP);
}

















  openDialog(){
    console.log('Aun no hace nada el boton pero jala chido jjjj');
  }
}
