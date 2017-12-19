import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {PacienteService} from '../services/paciente.service';

@Component({
  selector: 'pacientes',
  templateUrl: '../views/pacientes.html',
  styleUrls: ['../css/pacientes.css'],
  providers:[PacienteService]
})
export class PacientesComponent implements OnInit{

    public pacientes : any;
    public errorMessage: any;
    public totalDePacientes:number;

    constructor(
        private pacienteService:PacienteService
    ){}

    ngOnInit(){
        this.getPacientes();
    }

    getPacientes(){
        this.pacienteService.getPacientes().subscribe(
            (result: FirebaseListObservable<any>) =>{
                this.pacientes=result;
                if(!this.pacientes){alert('Error en el servidor')}
                else{
                    this.totalDePacientes=this.pacientes.length;
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


}