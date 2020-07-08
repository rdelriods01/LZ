import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';

import { Usuario } from '../models/usuario';

import { NewPacienteComponent } from './newPaciente.component';


@Component({
  selector: 'layout',
  templateUrl: '../views/layout.html',
  styleUrls: ['../css/layout.css']
})
export class LayoutComponent {

  public isLoggedIn: Boolean;
  public usuario:Usuario;
  public pacientes:any;
  
  public visible : Boolean=true;
  public sidenavVisible : Boolean=true;
  public mostrar : String='ocultarB';
  public mostrar2: String='hideResultado';
  public mostrar3: String ='hideResItem';

  public winWidth:any; 

  constructor(public authService: AuthService, 
              public pacienteService: PacienteService, 
              public router: Router,
              public dialog: MatDialog) {
    this.winWidth=(window.screen.width);
    if(this.winWidth<800){ this.sidenavVisible=false }
    this.usuario=new Usuario('','','','','');
    this.isLogged();
  }

  isLogged(){


    this.authService.af.authState.subscribe((data: firebase.User)=>{
      if(data){
        if(data.email=='ricardo@delrioperez.com'){
          data.updateProfile({ displayName:'Ricardo Del Rio',photoURL:'../assets/images/google.png'})
          this.usuario= new Usuario(data.uid,data.displayName,data.email,data.photoURL,'admin');
          console.log(this.usuario);
          this.isLoggedIn=true;
          this.getPacientes();
          this.router.navigate(['']);
        }else{
          if(data.email=='karen.guerra@lightzone.com.mx'){
            data.updateProfile({ displayName:'Karen Guerra',photoURL:'../assets/images/pp.png'})
            this.usuario= new Usuario(data.uid,data.displayName,data.email,data.photoURL,'user');
            console.log(this.usuario);
            this.isLoggedIn=true;
            this.getPacientes();
            this.router.navigate(['']);
          }else{
            console.log("sin acceso");
            this.isLoggedIn = false;
            this.usuario = null;
            alert('No tiene acceso');
            this.authService.logout();
            this.router.navigate(['login']);
          }
        }
      }else{    
        console.log("Logged out");
        this.isLoggedIn = false;
        this.usuario = null;
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
      this.isLoggedIn = false;
      this.authService.logout();
      this.router.navigate(['login']);
  }
// Obtener Pacientes
  getPacientes(){
    this.pacienteService.getPacientes().subscribe((pacs)=>{
      this.pacientes=pacs;
    });
  }

//Acciones para el buscador en navbar
  toggleBuscar(){
    this.visible = !this.visible;
    this.mostrar = this.visible ? 'ocultarB' : 'mostrarB ';
  }
  showResBus(){
    this.mostrar2='showResultado';
    this.mostrar3='showResItem';
  }
  hideResBus(){
    this.mostrar2='hideResultado';
    this.mostrar3='hideResItem';
  }
  //Busqueda de Pacientes 
  query = "";
  filteredList;

  resetQuery(){
    this.query="";
  }
  filter(){
    this.filteredList=this.filterByProperty(this.pacientes ,"nombre",this.query.toLowerCase());
  }
  //mi filtro
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



// Acciones para sidenav
  sidenavtoggle(){
    this.sidenavVisible=!this.sidenavVisible;
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewPacienteComponent);
  }

}