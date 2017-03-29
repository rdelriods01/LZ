import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';

// import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';

// import {GLOBAL} from '../services/global';
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
    public errorMessage:any;
    public id:String;
    public btnGuardarB:boolean=false;

    constructor(public dialogRef: MdDialogRef<NewPacienteComponent>,
                private pacienteService: PacienteService,
                private visitaService: VisitaService,
                private route:ActivatedRoute,
                private router: Router,
                ) {}

    ngOnInit(){
        this.paciente = new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","",false);
        this.visita=new Visita(0,"","",0,0,0,0,0,0,"","",false,null);
    }

    // sendFecha(event){
    //     let fyh =event.mifecha.split(" ");
    //     this.visita.fecha=fyh[0];
    //     this.visita.hora=fyh[1];
    //     if(fyh==""){
    //         this.btnGuardarB=false;
    //     }else{
    //         this.btnGuardarB=true;
    //     }
    // }
    test(){
        this.paciente.nombre=this.toCapital(this.paciente.nombre);
        this.pacienteService.savePaciente(this.paciente);
        this.visita.paciente=this.paciente;
        console.log(this.visita);
        this.visitaService.saveVisita(this.visita);
    }


    onSubmit(){
        this.paciente.nombre=this.toCapital(this.paciente.nombre);
        this.pacienteService.savePaciente(this.paciente);
        this.visita.paciente=this.paciente;
        console.log(this.visita);
        this.visitaService.saveVisita(this.visita);

        // this.pacienteService.addPaciente(this.paciente).subscribe(
        //     result =>{
        //         this.paciente= result.paciente;
        //         if(!this.paciente){
        //             alert('Error en el servidor');
        //         }else{
        //             this.visita.paciente=this.paciente._id;
        //             this._visitaService.addVisita(this.visita).subscribe(
        //                 result =>{
        //                     this.visita= result.visita;
        //                     if(!this.visita){
        //                         alert('Error en el servidor');
        //                     }else{
        //                         // activar GLOBAL.getDatos para recargar DB
        //                         this._GLOBAL.getDatos();
        //                     }
        //                 },
        //                 error =>{
        //                     this.errorMessage = <any>error;
        //                     if (this.errorMessage != null){
        //                         console.log(this.errorMessage);
        //                     }
        //                 }
        //             );
        //         }
        //     },
        //     error =>{
        //         this.errorMessage = <any>error;
        //         if (this.errorMessage != null){
        //             console.log(this.errorMessage);
        //         }
        //     }
        // );
    }

    toCapital(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); 
    }
//FIN
}
