import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { PacienteService } from '../services/paciente.service';
import { VisitaService } from '../services/visita.service';

import { Paciente } from '../models/paciente';
import { Visita } from '../models/visita';

@Component({
   selector: 'newPaciente',
   templateUrl: '../views/newPaciente.html',
    styleUrls: ['../css/newPaciente.css'],
    providers:[PacienteService, VisitaService ]

})
export class NewPacienteComponent implements OnInit{
    public paciente:Paciente;
    public visita: Visita;
    public id:String;
    public btnGuardarB:boolean=false;

    constructor( public dialogRef: MdDialogRef<NewPacienteComponent>,
                private pacienteService: PacienteService,
                private visitaService: VisitaService
                ) {}

    ngOnInit(){
        this.paciente = new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","",false);
        this.visita=new Visita('',0,"","",0,0,0,0,0,0,"","",false,null);
    }

    sendFecha(event){
        let fyh =event.mifecha.split(" ");
        this.visita.fecha=fyh[0];
        this.visita.hora=fyh[1];
        if(fyh==""){
            this.btnGuardarB=false;
        }else{
            this.btnGuardarB=true;
        }
    }
    onSubmit(){
        this.paciente.nombre=this.toCapital(this.paciente.nombre);
        this.pacienteService.savePaciente(this.paciente);
        this.visita.paciente=this.paciente.id;
        this.visitaService.saveVisita(this.visita);
        this.dialogRef.close();
    }

    toCapital(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); 
    }
//FIN
}
