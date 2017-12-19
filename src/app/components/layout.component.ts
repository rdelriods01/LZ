import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { MdDialog, MdDialogRef } from '@angular/material';

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

  private isLoggedIn: Boolean;
  private usuario:Usuario;
  public pacientes:any;
  
  public visible : Boolean=true;
  public sidenavVisible : Boolean=true;
  public mostrar : String='ocultarB';
  public mostrar2: String='hideResultado';
  public mostrar3: String ='hideResItem';

  constructor(public authService: AuthService, 
              private pacienteService: PacienteService, 
              private router: Router,
              public dialog: MdDialog) {
    this.isLogged();
  }

  isLogged(){


    this.authService.af.authState.subscribe((data: firebase.User)=>{
      if(data==null){
        console.log("Logged out");
        this.isLoggedIn = false;
        this.usuario = null;
        this.router.navigate(['login']);
      }else{    
        if(data.email=='ricardodelrio14@gmail.com'){
          this.isLoggedIn = true;
          console.log("Logged in");
          this.usuario = new Usuario(data.uid,data.displayName,data.email,data.photoURL);
          console.log(this.usuario);
          this.router.navigate(['']);
          this.getPacientes();
        }else{
          console.log("sin acceso");
          this.isLoggedIn = false;
          this.usuario = null;
          this.router.navigate(['login']);
          alert('No tiene acceso');
        }
      }
    });
    
    // this.authService.af.auth.currentUser.     
    // .subscribe(
    //   (data) => {
    //     if (data == null) {
    //       console.log("Logged out");
    //       this.isLoggedIn = false;
    //       this.usuario = null;
    //       this.router.navigate(['login']);
    //     } else {
    //       if(data.auth.email=='ricardodelrio14@gmail.com'){
    //         this.isLoggedIn = true;
    //         console.log("Logged in");
    //         this.usuario = new Usuario(data.auth.uid, data.auth.displayName, data.auth.email, data.auth.photoURL)
    //         console.log(this.usuario);
    //         this.router.navigate(['']);
    //         this.getPacientes();
    //       }else{            
    //         console.log("sin acceso");
    //         this.isLoggedIn = false;
    //         this.usuario = null;
    //         this.router.navigate(['login']);
    //         alert('No tiene acceso');
    //       }
    //     }
    //   }
    // );
  }

  logout() {
      this.isLoggedIn = false;
      this.authService.logout();
      this.router.navigate(['login']);
  }
// Obtener Pacientes
  getPacientes(){
    this.pacienteService.getPacientes().subscribe((pacs: FirebaseListObservable<any>)=>{
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
    console.log(this.sidenavVisible);
  }

  sendPaciente(x:any){
    console.log(x);
    // CONST.miPacienteActual=x;
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewPacienteComponent);
  }

}