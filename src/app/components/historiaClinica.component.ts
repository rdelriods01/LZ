import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente';

// import {CONST} from '../services/constantes';

@Component({
   selector: 'historia-clinica',
   templateUrl: '../views/historiaClinica.html',
    styleUrls: ['../css/historiaClinica.css'],
    providers:[PacienteService]
})
export class HistoriaClinicaComponent implements OnInit{
    public paciente:any;
    public errorMessage:any;
    public checked:string[]=[];
    public maldias:string[]=["0","0","0","0","0","0"];
    public males:string[]=[];
    public malestares:string[]=[
        'Estreñimiento','Insomnio','Dolor de cabeza','Zumbido de oidos','Cansancio excesivo','Inflamación'
    ];
    

    constructor(public dialogRef: MdDialogRef<HistoriaClinicaComponent>,
                private pacienteService: PacienteService,
                private _route:ActivatedRoute,
                private _router: Router,
                ) {}

    ngOnInit(){
        //  this.paciente = new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","",false);
        //  this.paciente = CONST.miPacienteActual;
        console.log('HistoriaClinicaComponent')
        console.log(this.paciente);
    }

    // actualizarHisCli(x:string){
    //     this.paciente.completo=true;
    //     for(let i=0;i<6;i++){
    //         if(this.maldias[i]!='0'){
    //             this.males.push(this.malestares[i]+' '+ this.maldias[i]+' dias a la semana')
    //         }
    //     }
    //     this.paciente.malestares=this.males.toString();
    //     this.males=[];
    //     this.paciente.enfermedades=this.checked.toString();
    //     // console.log(this.visita);
    //     this.pacienteService.editPaciente(this.paciente.id, this.paciente).subscribe(
    //         result =>{
    //             this.paciente= result.paciente;
    //             if(!this.paciente){
    //                 alert('Error en el servidor al editar');
    //             }else{
    //                 if(x='dyc'){
    //                     this._router.navigate(['/']);
    //                     this._router.navigate(['/paciente',this.paciente.id]);
    //                 }else{
    //                     this._router.navigate(['/paciente',this.paciente.id]);
    //                 }
    //             }
    //         },
    //         error =>{
    //             this.errorMessage = <any>error;
    //             if (this.errorMessage != null){
    //                 console.log(this.errorMessage);
    //             }
    //         }
    //     );
    // }

    updateChecked(option, event) {
    var index = this.checked.indexOf(option);
    if(event.target.checked) {
      if(index === -1) {
        this.checked.push(option);
      }
    } else {
      if(index !== -1) {
        this.checked.splice(index, 1);
      }
    }
  }


//FIN
}